import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { LoginInput, SignupInput } from "./schemas";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [missingMemoirError, setMissingMemoirError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const processPendingMemoir = async () => {
    const pendingMemoirData = localStorage.getItem("pending_memoir");
    if (pendingMemoirData) {
      try {
        const memoirPayload = JSON.parse(pendingMemoirData);
        const createdMemoir = await api.createMemoir(memoirPayload);
        localStorage.setItem("active_memoir", JSON.stringify(createdMemoir));
        localStorage.removeItem("pending_memoir");
      } catch (err) {
        console.error("Failed to auto-create memoir during onboarding:", err);
      }
    }
  };

  const startAuthAction = () => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);
  };

  const handleLogin = async (data: LoginInput): Promise<boolean> => {
    startAuthAction();

    try {
      // 1. Authenticate the user
      const res = await api.login({
        email: data.email,
        password: data.password,
      });

      // 2. Extract and store access token
      const accessToken = res.access_token || res.token || res.data?.access_token;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        // Force the API client to use the new token immediately
        window.dispatchEvent(new Event("storage")); 
      }

      // --- SMART MEMOIR CHECK & CREATION LOGIC ---
      try {
        // Check the database: Does this user already have memoirs?
        const memoirs = await api.getUserMemoirs();

        if (!memoirs || memoirs.length === 0) {
          // NO MEMOIRS FOUND: Check if we have data from the onboarding screen
          const pendingMemoirStr = localStorage.getItem("pending_memoir");
          
          if (pendingMemoirStr) {
            // We have onboarding data! Create the memoir right now.
            const pendingMemoir = JSON.parse(pendingMemoirStr);
            const createdMemoir = await api.createMemoir(pendingMemoir);
            const activeMemoir = createdMemoir.data || createdMemoir;
            
            // Save it to session and clean up the pending data
            localStorage.setItem("active_memoir", JSON.stringify(activeMemoir));
            localStorage.removeItem("pending_memoir");
          } else {
            // Edge case: No memoirs in DB AND they somehow skipped onboarding
            setMissingMemoirError(
              "Account verified, but no memoir setup data was found. Please complete the setup."
            );
            setLoading(false);
            return false; // Halt execution
          }
        } else {
          // MEMOIRS EXIST: The user is logging in again. 
          // Do NOT create a new one. Just load their existing memoir.
          localStorage.setItem("active_memoir", JSON.stringify(memoirs[0]));
          
          // Safety cleanup: If they re-did onboarding by accident, wipe the stale pending data
          localStorage.removeItem("pending_memoir");
        }
      } catch (memoirCheckError) {
        console.error("Could not verify or create memoir during login", memoirCheckError);
      }
      // ------------------------------------------

      // 3. Everything is ready, send them to the dashboard
      router.push("/dashboard");
      return true;
      
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setServerError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (
    data: SignupInput & { confirmPassword?: string }
  ): Promise<boolean> => {
    startAuthAction();

    try {
      const res = await api.signup({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });

      const accessToken = res.access_token || res.token || res.data?.access_token;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        await processPendingMemoir();
      }

      setSuccessMessage(
        "Account created successfully! Please proceed to log in."
      );
      setTimeout(() => router.push("/login"), 2000);
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred during signup";
      setServerError(errorMessage);
      return false;
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
    missingMemoirError,
    handleLogin,
    handleSignup,
  };
}