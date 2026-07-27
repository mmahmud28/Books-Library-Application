"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBookOpen,
} from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      photoURL: formData.get("photoURL"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };
    console.log("Registration Data:", data);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Registration Result:", result);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Background */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[150px]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
          {/* Left */}
          <div className="hidden flex-col justify-between bg-gradient-to-br from-indigo-700/80 via-violet-700/80 to-cyan-700/80 p-14 text-white lg:flex">
            <div>
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-4xl backdrop-blur-xl"
              >
                📚
              </motion.div>

              <h1 className="text-5xl font-black leading-tight">
                BiblioDrop
              </h1>

              <p className="mt-3 text-xl text-cyan-100">
                Online Book Delivery Management System
              </p>

              <p className="mt-8 text-white/80">
                Discover books, manage deliveries, and enjoy a premium reading
                experience with secure authentication.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Book Delivery Tracking",
                "Fast Registration",
                "Secure Authentication",
                "Responsive Dashboard",
              ].map((item) => (
                <motion.div
                  whileHover={{ x: 8 }}
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-xl"
                >
                  <FaBookOpen className="text-cyan-300" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              whileHover={{ y: -4 }}
              className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
            >
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg">
                  📖
                </div>

                <h2 className="text-4xl font-bold text-white">
                  Create Account
                </h2>

                <p className="mt-2 text-slate-300">
                  Join BiblioDrop today
                </p>
              </div>

              <form className="mt-8 space-y-5">
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 text-white placeholder:text-slate-400 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 text-white placeholder:text-slate-400 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-indigo-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 text-white placeholder:text-slate-400 focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-indigo-400" />
                  <input
                    type="url"
                    placeholder="Photo URL"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-indigo-400" />

                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 pr-12 text-white placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-4 text-xl text-slate-300"
                  >
                    {showPass ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-indigo-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input input-bordered h-14 w-full rounded-2xl border-white/10 bg-white/10 pl-12 pr-12 text-white placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-4 text-xl text-slate-300"
                  >
                    {showConfirm ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>

                <motion.button
                onClick={handleRegister}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: .98 }}
                  className="h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 font-semibold text-white shadow-lg transition"
                >
                  Create Account
                </motion.button>

                <div className="divider text-slate-400">OR</div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="button"
                  className="btn h-14 w-full rounded-2xl border border-white/10 bg-white/10 text-white hover:bg-white/20"
                >
                  <FaGoogle className="text-red-500" />
                  Continue with Google
                </motion.button>
              </form>

              <p className="mt-8 text-center text-slate-300">
                Already have an account?
                <Link
                  href="/login"
                  className="ml-2 font-semibold text-cyan-400 hover:underline"
                >
                  Login
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}