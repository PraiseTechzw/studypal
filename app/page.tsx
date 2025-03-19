"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Brain, CheckCircle, Laptop, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-[#2D3748] to-[#1A202C] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748] to-transparent" />
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-[#319795]/20 text-[#319795] text-sm font-medium mb-4"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  The Future of Student Organization
                </motion.div>
                <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Your Academic Success, Organized Digitally
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Streamline your study materials, boost productivity, and achieve better results with StudPal's
                  intelligent organization system.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" className="bg-[#319795] hover:bg-[#2C7A7B] text-lg px-8 py-6">
                  Start Organizing - Free Forever
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full h-full min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#319795] to-[#2D3748] rounded-lg opacity-20 animate-pulse" />
                <img
                  alt="App screenshot"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                  height="400"
                  src="/placeholder.svg"
                  width="600"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Students" },
              { number: "1M+", label: "Study Materials" },
              { number: "98%", label: "Success Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#319795]">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2D3748]">How StudPal Works</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your academic journey with our intelligent organization system
              </p>
            </div>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                icon: BookOpen,
                title: "Collect",
                description: "Easily import notes, PDFs, and web links into one secure location"
              },
              {
                icon: Brain,
                title: "Organize",
                description: "Smart tagging and AI-powered categorization for effortless management"
              },
              {
                icon: CheckCircle,
                title: "Achieve",
                description: "Track progress and meet deadlines with our smart calendar system"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-4 p-8 border rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4 bg-[#319795]/10 rounded-full">
                  <feature.icon className="w-8 h-8 text-[#319795]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2D3748]">{feature.title}</h3>
                <p className="text-center text-gray-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-4"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2D3748]">
                  See StudPal in Action
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience how StudPal transforms your study materials into an organized digital library
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="gap-2 bg-[#319795] hover:bg-[#2C7A7B] text-lg px-8 py-6">
                  Try Interactive Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <Laptop className="w-full h-auto text-[#2D3748]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2D3748]">Trusted by Students</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how StudPal is helping students achieve their academic goals
              </p>
            </div>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {[
              {
                name: "Sarah Johnson",
                university: "Stanford University",
                image: "/placeholder.svg",
                testimonial: "StudPal has completely transformed how I organize my study materials. It's intuitive and powerful!"
              },
              {
                name: "Michael Chen",
                university: "MIT",
                image: "/placeholder.svg",
                testimonial: "The AI-powered organization features have saved me countless hours. Highly recommended!"
              },
              {
                name: "Emma Davis",
                university: "Harvard University",
                image: "/placeholder.svg",
                testimonial: "Best study organization tool I've ever used. The collaborative features are game-changing!"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-4 p-8 border rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img
                    alt={testimonial.name}
                    className="rounded-full"
                    height="48"
                    src={testimonial.image}
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width="48"
                  />
                  <div>
                    <h3 className="font-bold text-[#2D3748]">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.university}</p>
                  </div>
                </div>
                <p className="text-gray-500 italic">"{testimonial.testimonial}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#2D3748] to-[#1A202C] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3748] to-transparent" />
        <div className="container relative px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of students already using StudPal to achieve their academic goals
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button size="lg" className="bg-[#319795] hover:bg-[#2C7A7B] text-lg px-8 py-6">
                Start Organizing - Free Forever
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#1A202C]">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 StudPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

