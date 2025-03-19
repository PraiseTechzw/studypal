"use client"

import { SignIn } from '@clerk/nextjs'
import { motion } from "framer-motion"
import Link from "next/link"

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to continue your study journey</p>
      </div>

      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-none",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "bg-white border border-gray-200 hover:bg-gray-50",
            socialButtonsBlockButtonText: "text-gray-700",
            formButtonPrimary: "bg-[#319795] hover:bg-[#2C7A7B]",
            footerActionLink: "text-[#319795] hover:text-[#2C7A7B]",
          },
        }}
      />

      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#319795] hover:text-[#2C7A7B] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}