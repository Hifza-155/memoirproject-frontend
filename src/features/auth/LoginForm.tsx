/**
 * @file page.tsx (LoginForm)
 * @description Client-side React component that renders the user login interface,
 * manages form field validation via React Hook Form and Zod, and delegates network requests 
 * and submission states to the `useAuth` custom hook while preserving exact frame and layout specs.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { loginSchema, LoginInput } from "./schemas";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./hooks";

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const { loading, serverError, setServerError, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setServerError(null);
    setInfoMessage("Password reset functionality will be available soon.");
  };

  return (
    <section className="min-h-screen bg-[#faf8f5] text-[#381c24] flex items-center justify-center px-6 py-16 relative z-10 font-sans selection:bg-[#381c24] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-white border border-[#f0e4d3] rounded-3xl px-8 md:px-12 py-10 shadow-sm max-w-170"
      >
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-[#78716c] hover:text-[#381c24] text-[15px] font-medium transition inline-flex items-center gap-1"
          >
            ←
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-[#381c24] leading-snug">
            Step back into <br /> your family&rsquo;s safe space
          </h1>
        </div>

        {/* Server Error / Info Banners */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-serif">
            Login Failed: {serverError}
          </div>
        )}

        {infoMessage && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-serif">
            {infoMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="login-email" className="block text-xs uppercase tracking-widest font-bold text-[#381c24]/70 mb-1.5">
              Email *
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Email*"
              {...register("email")}
              className={`w-full rounded-xl border bg-[#faf8f5] px-5 py-4 text-[16px] text-[#381c24] placeholder:text-[#78716c]/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                errors.email
                  ? "border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border-[#f0e4d3] focus:border-[#c9a063] focus:ring-2 focus:ring-[#c9a063]/20"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs uppercase tracking-widest font-bold text-[#381c24]/70 mb-1.5">
              Password *
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Password*"
              {...register("password")}
              className={`w-full rounded-xl border bg-[#faf8f5] px-5 py-4 text-[16px] text-[#381c24] placeholder:text-[#78716c]/60 outline-none transition-all duration-300 font-serif shadow-2xs ${
                errors.password
                  ? "border-red-400 focus:ring-2 focus:ring-red-300"
                  : "border-[#f0e4d3] focus:border-[#c9a063] focus:ring-2 focus:ring-[#c9a063]/20"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm text-[#78716c] font-serif py-1">
            <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#f0e4d3] text-[#381c24] accent-[#381c24] cursor-pointer"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="hover:text-[#381c24] transition underline underline-offset-2 bg-transparent border-none cursor-pointer text-sm text-[#78716c]"
            >
              Forgot your password?
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
            className={`w-full mt-2 py-4 rounded-xl text-[16px] font-semibold transition-all duration-300 cursor-pointer shadow-md ${
              !loading
                ? "bg-[#381c24] text-white hover:bg-[#4a222a] shadow-[#381c24]/10"
                : "bg-[#f0e4d3] text-[#78716c] cursor-not-allowed shadow-none"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="border border-[#f0e4d3] rounded-2xl mt-8 py-4 text-center text-sm text-[#78716c] font-serif bg-[#faf8f5]">
          Not a member yet?{" "}
          <Link
            href="/signup"
            className="text-[#381c24] font-semibold ml-1 hover:underline underline-offset-2"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
