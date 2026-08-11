"use client";

import { signIn } from "@/lib/auth-client";
import { Form } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Login successful!");
      router.push(redirectUrl);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Welcome Back</h2>

            <p className="text-base-content/70 mt-2">
              Login to your BiblioDrop account.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Email Address
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <div className="flex justify-between items-center mb-2">
                <label className="label p-0">
                  <span className="label-text font-medium">
                    Password
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm link link-primary"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                type="password"
                name="password"
                placeholder="********"
                className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>

            <div className="divider">OR</div>

            {/* Google Login */}
            <button
              type="button"
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            {/* Sign Up */}
            <p className="text-center text-sm mt-4">
              Dont have an account?

              <Link
                href={`/auth/signup?redirect=${encodeURIComponent(
                  redirectUrl
                )}`}
                className="link link-primary font-semibold ml-1"
              >
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;