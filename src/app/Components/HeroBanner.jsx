"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import {
  Button,
  Chip,
} from "@heroui/react";

import {
  ArrowRight,
  BookOpen,
  Magnifier,
  Star,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";

const slides = [
  {
    title: "Discover Your Next Favorite Book",
    subtitle:
      "Explore thousands of books from libraries and trusted sellers. Read smarter, faster, everywhere.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
  },
  {
    title: "Read • Learn • Grow",
    subtitle:
      "Build your knowledge with beautifully organized collections across every category.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
  },
  {
    title: "Books Delivered To Your Door",
    subtitle:
      "Fast delivery, secure payment, and personalized recommendations for every reader.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 min-h-[88vh]">

      {/* Glow */}
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            fill
            priority
            alt="Library"
            className="object-cover opacity-20"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[88vh] max-w-7xl items-center px-6">

        <div className="grid w-full gap-16 lg:grid-cols-2 items-center">

          {/* Left */}

          <AnimatePresence mode="wait">

            <motion.div
              key={current + "text"}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .6 }}
            >

              <Chip
                variant="flat"
                color="primary"
                className="mb-6 text-black"
              >
                <BookOpen width={16} height={16} />
                <span className="ml-2 text-black">
                  Trusted by Thousands of Readers
                </span>
              </Chip>

              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">

                {slides[current].title}

              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">

                {slides[current].subtitle}

              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Button
                  color="primary"
                  size="lg"
                  endContent={<ArrowRight width={18} height={18} />}
                >
                  Browse Books
                </Button>

                <Button
                  variant="bordered"
                  size="lg"
                  className="border-white/20 text-white"
                  startContent={<Magnifier width={18} height={18} />}
                >
                  Search Library
                </Button>

              </div>

              <div className="mt-12 flex gap-8">

                <div>
                  <h3 className="text-3xl font-bold text-white">
                    50K+
                  </h3>
                  <p className="text-gray-400">
                    Books
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">
                    10K+
                  </h3>
                  <p className="text-gray-400">
                    Readers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white">
                    4.9
                  </h3>

                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map((i)=>(
                      <Star
                        key={i}
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>

                </div>

              </div>

            </motion.div>

          </AnimatePresence>

          {/* Right */}

          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: .8
            }}
            className="relative hidden lg:flex justify-center"
          >

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="relative h-[520px] w-[400px] overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl"
            >
              <Image
                src={slides[current].image}
                fill
                alt=""
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/10 p-5 backdrop-blur-md">

                <h3 className="text-xl font-bold text-white">
                  Digital Library
                </h3>

                <p className="mt-2 text-sm text-gray-300">
                  Thousands of books are waiting for you.
                </p>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Controls */}

      <button
        onClick={prev}
        className="absolute left-5 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
      >
        <ChevronLeft width={20} height={20} className="text-white" />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur hover:bg-white/20"
      >
        <ChevronRight width={20} height={20} className="text-white" />
      </button>

      {/* Dots */}

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all ${
              current === i
                ? "w-10 bg-cyan-400"
                : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}