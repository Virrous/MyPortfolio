"use client";

import { Code, Blocks } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-white px-8 py-24"
    >
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-24">
        {/* Left: Intro + Tech stack */}
        <div className="max-w-lg space-y-10 text-center lg:text-left">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            👋 I am{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Ashes
            </span>
          </h1>

          <div className="flex justify-center lg:justify-start gap-8">
            <div className="flex items-center gap-3 bg-purple-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-default">
              <Code className="w-7 h-7 text-purple-600" />
              <span className="font-semibold text-purple-700 text-lg">
                Python
              </span>
            </div>
            <div className="flex items-center gap-3 bg-purple-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-default">
              <Blocks className="w-7 h-7 text-purple-600" />
              <span className="font-semibold text-purple-700 text-lg">
                Blockchain
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed max-w-md">
            Passionate about building innovative web applications, smart
            contracts, and AI-powered solutions that make a difference in the
            digital world. I specialize in Python and blockchain technology,
            creating scalable and secure systems.
          </p>

          <button className="mt-4 bg-purple-600 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-purple-700 transition duration-300">
            My resume?
          </button>
        </div>

        {/* Right: Photo + decorative background */}
        <div className="relative w-96 h-96 mx-auto lg:mx-0 rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-500 cursor-pointer">
          {/* Decor background: blurred gradient blob */}
          <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-purple-400 to-blue-500 opacity-30 filter blur-3xl z-0"></div>

          {/* Photo container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-purple-200 z-10">
            <Image
              src="/my.jpg"
              alt="Ashes"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>

          {/* Tagline below photo */}
          <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-purple-700 font-semibold z-20 text-lg bg-white bg-opacity-90 px-6 py-2 rounded-lg shadow-md">
            Virrous
          </p>
        </div>
      </div>
    </section>
  );
}
