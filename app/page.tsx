"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Brain, CheckCircle, Laptop, Sparkles, Star, Zap, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#319795]/5 to-transparent" />
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
        
        {/* Animated Background Shapes */}
        <motion.div
          className="absolute top-0 -left-4 w-72 h-72 bg-[#319795] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
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
          className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
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
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          animate={{
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#319795]/10 text-[#319795] text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                The Future of Student Organization
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#319795] to-[#2C7A7B]">
                  Organize Your
                </span>
                <br />
                Study Journey
              </h1>

              <p className="text-xl text-gray-600 max-w-xl">
                Transform your academic success with StudPal's intelligent organization system. 
                Streamline your study materials and boost productivity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#319795] hover:bg-[#2C7A7B] text-lg px-8 py-6">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8">
                {[
                  { number: "10K+", label: "Active Students" },
                  { number: "1M+", label: "Study Materials" },
                  { number: "98%", label: "Success Rate" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-[#319795]">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - App Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* App Preview Container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* App Header */}
                  <div className="bg-white border-b p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="bg-gray-50 p-6">
                    <div className="space-y-6">
                      {/* Welcome Section */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">Welcome back, Alex!</h3>
                          <p className="text-gray-600">Here's your study overview</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#319795] flex items-center justify-center text-white">
                          A
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Clock, label: "Study Time", value: "2h 30m" },
                          { icon: BookOpen, label: "Materials", value: "24" },
                          { icon: Star, label: "Progress", value: "85%" },
                          { icon: Zap, label: "Focus Score", value: "92" }
                        ].map((stat, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-xl shadow-sm"
                          >
                            <stat.icon className="w-6 h-6 text-[#319795] mb-2" />
                            <div className="text-sm text-gray-600">{stat.label}</div>
                            <div className="text-xl font-semibold">{stat.value}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div>
                        <h4 className="font-semibold mb-3">Recent Activity</h4>
                        <div className="space-y-3">
                          {[
                            { text: "Added new study notes", time: "2h ago" },
                            { text: "Completed practice test", time: "4h ago" },
                            { text: "Joined study group", time: "1d ago" }
                          ].map((activity, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ x: 5 }}
                              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-[#319795]" />
                                <span>{activity.text}</span>
                              </div>
                              <span className="text-sm text-gray-500">{activity.time}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#319795] rounded-full opacity-10" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#319795] to-[#2C7A7B]">
                {" "}succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed to help you organize, study, and achieve your academic goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Organization",
                description: "Smart categorization and tagging of your study materials"
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Study groups and shared resources for better learning"
              },
              {
                icon: Clock,
                title: "Study Analytics",
                description: "Track your progress and optimize your study habits"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#319795]/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[#319795]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#319795] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container relative px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to transform your study journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students already using StudPal to achieve their academic goals
            </p>
            <Button size="lg" className="bg-white text-[#319795] hover:bg-white/90 text-lg px-8 py-6">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">StudPal</h3>
              <p className="text-gray-400">Your academic success companion</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Product</h4>
              <ul className="space-y-2">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Features</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Pricing</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Demo</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <ul className="space-y-2">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">About</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Blog</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Careers</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Legal</h4>
              <ul className="space-y-2">
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Privacy Policy</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Terms of Service</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" href="#">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 StudPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

