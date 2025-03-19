"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <span className="text-2xl font-bold text-[#319795]">StudPal</span>
          </Link>
          {children}
        </div>
      </motion.div>

      {/* Right side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex flex-1 bg-[#319795] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Transform Your Study Journey
          </h1>
          <p className="text-xl text-white/90 max-w-lg mb-8">
            Join thousands of students already using StudPal to organize their study materials and achieve academic success.
          </p>
          <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
            {[
              { icon: "🎯", title: "Smart Organization", description: "AI-powered study material management" },
              { icon: "🤝", title: "Collaborative Learning", description: "Study groups and shared resources" },
              { icon: "📊", title: "Progress Tracking", description: "Monitor your academic growth" },
              { icon: "🔒", title: "Secure Storage", description: "Your data is always protected" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  )
}

