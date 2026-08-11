"use client";

import { signUp } from "@/lib/auth-client";
import { Form } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const image = formData.get("image");
    const role = formData.get("role");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Password validation চাইলে এখানে চালু করতে পারো
    // if (
    //   password.length < 8 ||
    //   !/[A-Z]/.test(password) ||
    //   !/\d/.test(password)
    // ) {
    //   toast.error(
    //     "Password must contain at least 8 characters, one uppercase letter, and one number."
    //   );
    //   return;
    // }

    try {
      const { data, error: authError } = await signUp.email({
        name,
        phone,
        email,
        image,
        role,
        password,
      });

      if (authError) {
        toast.error(authError.message);
      } else {
        toast.success("Account created successfully!");
      }

      if (!authError) {
        router.push(redirectUrl);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Something went wrong during sign up!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold">
              Create Your Account
            </h2>

            <p className="text-base-content/70 mt-2">
              Join BiblioDrop and start your reading journey.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="space-y-4">

            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Phone Number
                  </span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                  required
                />
              </div>

            </div>

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

            {/* Photo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Photo URL
                </span>
              </label>

              <input
                type="url"
                name="image"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                required
              />
            </div>

            {/* Role */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  Select Your Role
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">

                {/* User */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    className="peer hidden"
                    defaultChecked
                  />

                  <div className="border-2 border-base-300 rounded-xl p-4 text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-content hover:border-primary">
                    <h3 className="font-semibold">
                      👤 User
                    </h3>

                    <p className="text-xs opacity-80 mt-1">
                      Browse & Buy Books
                    </p>
                  </div>
                </label>

                {/* Librarian */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="librarian"
                    className="peer hidden"
                  />

                  <div className="border-2 border-base-300 rounded-xl p-4 text-center transition-all duration-200 peer-checked:border-success peer-checked:bg-success peer-checked:text-success-content hover:border-success">
                    <h3 className="font-semibold">
                      📚 Librarian
                    </h3>

                    <p className="text-xs opacity-80 mt-1">
                      Manage Books
                    </p>
                  </div>
                </label>

                {/* Admin */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    className="peer hidden"
                  />

                  <div className="border-2 border-base-300 rounded-xl p-4 text-center transition-all duration-200 peer-checked:border-error peer-checked:bg-error peer-checked:text-error-content hover:border-error">
                    <h3 className="font-semibold">
                      🛡️ Admin
                    </h3>

                    <p className="text-xs opacity-80 mt-1">
                      Full System Access
                    </p>
                  </div>
                </label>

              </div>
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Password
                  </span>
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Confirm Password
                  </span>
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  className="input input-bordered w-full text-base-content placeholder:text-base-content/50"
                  required
                />
              </div>

            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Create Account
            </button>

            <div className="divider">OR</div>

            {/* Google */}
            <button
              type="button"
              className="btn btn-outline w-full"
            >
              Continue with Google
            </button>

            {/* Login */}
            <p className="text-center text-sm mt-4">
              Already have an account?

              <a
                href={`/auth/login?redirect=${encodeURIComponent(
                  redirectUrl
                )}`}
                className="link link-primary font-semibold ml-1"
              >
                Login
              </a>
            </p>

          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;