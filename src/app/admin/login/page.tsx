"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/admin";
import Image from "next/image";

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/cashbook-logo.svg"
              alt="CashBook"
              width={140}
              height={32}
              priority
            />
          </div>

          <h1 className="text-xl font-bold text-text text-center mb-2">
            Admin Login
          </h1>
          <p className="text-text-secondary text-sm text-center mb-6">
            Enter your credentials to access the dashboard
          </p>

          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="bg-error/10 border border-error/20 text-error text-sm p-3 rounded-lg">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="form-input"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="form-input"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold text-base py-3 rounded-xl transition-colors duration-200"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
