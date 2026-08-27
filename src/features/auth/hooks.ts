import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { LoginInput, SignupInput } from "./schemas";

/**
 * Custom React hook that centralizes authentication state, API communication,
 * session management, and automated onboarding memoir creation.
 */
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Retrieves any temporary onboarding memoir data from localStorage
   * and dispatches a request to provision the container on the backend.
   */
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

  /**
   * Resets active feedback states and flags the process as loading.
   */
  const startAuthAction = () => {
    setLoading(true);
    setServerError(null);
    setSuccessMessage(null);
  };

  /**
   * Submits user login credentials, secures the auth token,
   * handles pending onboarding actions, and routes to the dashboard.
   */
  const handleLogin = async (data: LoginInput) => {
    startAuthAction();

    try {
      const res = await api.login({
        email: data.email,
        password: data.password,
      });

      const accessToken = res.access_token || res.token || res.data?.access_token;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        await processPendingMemoir();
      }

      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user account, manages token storage, evaluates email 
   * verification requirements, and orchestrates user redirection.
   */
  const handleSignup = async (data: SignupInput & { confirmPassword?: string }) => {
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

      if (res.requires_verification || (res.message && res.message.includes("confirm"))) {
        setSuccessMessage(
          "Account created! Please check your email to confirm your account before logging in."
        );
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred during signup";
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