/**
 * @file hooks.ts
 * @description Custom React hook (`useAuth`) that centralizes Supabase authentication logic 
 * (login and signup API calls, database profile insertions, error management, and routing navigation) 
 * for the authentication feature module.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/api/client";
import { LoginInput, SignupInput } from "./schemas";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (data: LoginInput) => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (authData.user) {
        const { error: dbError } = await supabase
          .from("user_account")
          .update({ last_login_at: new Date().toISOString() })
          .eq("id", authData.user.id);

        if (dbError) {
          console.error(
            "Failed to update last login timestamp:",
            dbError.message
          );
        }
      }

      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupInput & { confirmPassword?: string }) => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      // 1. Sign up via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        // 2. Insert profile into user_account table
        const { error: dbError } = await supabase.from("user_account").insert([
          {
            id: authData.user.id,
            email: authData.user.email,
            full_name: data.full_name,
          },
        ]);

        if (dbError) {
          throw new Error("Database profile save error: " + dbError.message);
        }

        // 3. Handle email confirmation state properly
        if (!authData.session) {
          setSuccessMessage(
            "Account created! Please check your email to confirm your account before logging in."
          );
          setTimeout(() => router.push("/login"), 3000);
          return;
        }

        router.push("/subscription");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    serverError,
    successMessage,
    setServerError,
    setSuccessMessage,
    handleLogin,
    handleSignup,
  };
}
