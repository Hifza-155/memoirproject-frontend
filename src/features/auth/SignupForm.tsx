/**
 * @file signupForm.tsx
 * @description Client-side React component that renders the user registration form,
 * manages form field validation via React Hook Form and Zod, and delegates network actions 
 * and submission states to the `useAuth` custom hook while preserving exact UI styles,
 * refactored to use shared theme color tokens.
 */

"use client";
import { signupSchema } from "./schemas";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "./hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const extendedSignupSchema = signupSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match!",
  path: ["confirmPassword"],
});

type ExtendedSignupInput = z.infer<typeof extendedSignupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const { loading, serverError, successMessage, handleSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExtendedSignupInput>({
    resolver: zodResolver(extendedSignupSchema),
  });

  useEffect(() => {
    if (successMessage) {
      router.push("/dashboard");
    }
  }, [successMessage, router]);

  // Restored proper handler connecting input data to the useAuth hook and safeguarding redirection
  const onSubmit = async (data: ExtendedSignupInput) => {
    try {
      await handleSignup(data);
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <section className="min-h-screen bg-memory-bg text-memory-primary flex items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-memory-primary selection:text-memory-light">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-memory-card border border-memory-border rounded-3xl px-8 md:px-12 py-10 shadow-sm max-w-170"
      >
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/invite-family-friends"
            className="text-memory-muted hover:text-memory-primary text-[15px] font-medium transition inline-flex items-center gap-1"
          >
            ←
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-memory-primary leading-snug">
            Let’s create a safe space <br className="hidden sm:block" /> for
            your memories
          </h1>

          <div className="flex flex-col text-[15px] text-memory-muted whitespace-nowrap">
            <span>Have an account?</span>
            <Link
              href="/login"
              className="text-memory-primary font-semibold hover:underline transition mt-0.5"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Server Success / Error Banners (Replaces Alerts) */}
        {serverError && (
          <div className="mb-6 p-4 bg-memory-card border border-memory-border text-memory-primary rounded-xl text-sm font-serif">
            Failed: {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-memory-card border border-memory-border text-memory-primary rounded-xl text-sm font-serif">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="signup-fullname" className="sr-only">Full Name</label>
            <input
              id="signup-fullname"
              type="text"
              placeholder="Full Name*"
              {...register("full_name")}
              className={`w-full rounded-xl border bg-memory-bg px-5 py-4 text-[16px] text-memory-primary placeholder:text-memory-muted/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                errors.full_name
                  ? "border-memory-border focus:ring-2 focus:ring-memory-accent/20"
                  : "border-memory-border focus:border-memory-accent focus:ring-2 focus:ring-memory-accent/20"
              }`}
            />
            {errors.full_name && (
              <p className="mt-1 text-xs text-memory-muted font-medium">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="signup-email" className="sr-only">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email*"
              {...register("email")}
              className={`w-full rounded-xl border bg-memory-bg px-5 py-4 text-[16px] text-memory-primary placeholder:text-memory-muted/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                errors.email
                  ? "border-memory-border focus:ring-2 focus:ring-memory-accent/20"
                  : "border-memory-border focus:border-memory-accent focus:ring-2 focus:ring-memory-accent/20"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-memory-muted font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="signup-password" className="sr-only">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="Password*"
                {...register("password")}
                className={`w-full rounded-xl border bg-memory-bg px-5 py-4 text-[16px] text-memory-primary placeholder:text-memory-muted/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                  errors.password
                    ? "border-memory-border focus:ring-2 focus:ring-memory-accent/20"
                    : "border-memory-border focus:border-memory-accent focus:ring-2 focus:ring-memory-accent/20"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-memory-muted font-medium">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="signup-confirmpassword" className="sr-only">Confirm Password</label>
              <input
                id="signup-confirmpassword"
                type="password"
                placeholder="Confirm Password*"
                {...register("confirmPassword")}
                className={`w-full rounded-xl border bg-memory-bg px-5 py-4 text-[16px] text-memory-primary placeholder:text-memory-muted/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                  errors.confirmPassword
                    ? "border-memory-border focus:ring-2 focus:ring-memory-accent/20"
                    : "border-memory-border focus:border-memory-accent focus:ring-2 focus:ring-memory-accent/20"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-memory-muted font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
            className={`w-full mt-2 py-4 rounded-xl text-[16px] font-semibold transition-all duration-300 cursor-pointer shadow-md ${
              !loading
                ? "bg-memory-primary text-memory-light hover:bg-memory-maroon shadow-memory-primary/10"
                : "bg-memory-border text-memory-muted cursor-not-allowed shadow-none"
            }`}
          >
            {loading ? "Creating account..." : "Continue"}
          </motion.button>
        </form>

        <p className="text-center text-sm font-serif text-memory-muted mt-8">
          By clicking create an account you agree to the{" "}
          <span className="text-memory-primary font-medium cursor-pointer hover:underline underline-offset-2">
            Terms and Conditions
          </span>
        </p>
      </motion.div>
    </section>
  );
}