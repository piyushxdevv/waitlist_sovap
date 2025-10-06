"use client"
import { Moon, Sun, Shield, Target, Zap, BookOpen } from "lucide-react"
import type React from "react"
import { motion } from "framer-motion"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { joinWaitlist, getWaitlistCount } from "@/lib/actions/waitlist"

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(100)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    async function fetchCount() {
      const { count } = await getWaitlistCount()
      setWaitlistCount(count)
    }
    fetchCount()
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result = await joinWaitlist(email)

    if (result.success) {
      setMessage({ type: "success", text: result.message })
      setEmail("")
      // Refresh count
      const { count } = await getWaitlistCount()
      setWaitlistCount(count)
    } else {
      setMessage({ type: "error", text: result.message })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Background decorations - hidden on mobile for cleaner look */}
      <div className="hidden lg:block absolute left-0 top-0 w-16 h-full">
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5 border-r border-dashed border-gray-400 dark:border-gray-600"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 4px, currentcolor 4px, currentcolor 6px)",
          }}
        />
      </div>
      <div className="hidden lg:block absolute right-0 top-0 w-16 h-full">
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5 border-l border-dashed border-gray-400 dark:border-gray-600"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 4px, currentcolor 4px, currentcolor 6px)",
          }}
        />
      </div>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                <span className="font-custom text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  SOVAP
                </span>
              </div>

              {/* Dark mode toggle */}
              <button
                type="button"
                onClick={toggleDarkMode}
                className="relative inline-flex h-10 w-20 items-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                <span
                  className={`inline-block h-7 w-7 transform rounded-full bg-white dark:bg-gray-900 transition-transform duration-300 shadow-lg ${
                    isDark ? 'translate-x-11' : 'translate-x-1'
                  }`}
                >
                  <span className="flex h-full w-full items-center justify-center">
                    {isDark ? (
                      <Moon className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    )}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Hero Title */}
                <div className="space-y-4">
                  <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                    Your Personalized AI Tutor for{" "}
                    <span className="text-blue-600 dark:text-blue-400">Cybersecurity</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    A 24/7 smart mentor that adapts to your level, speed, and goals—taking you from beginner to
                    cybersecurity engineer.
                  </p>
                </div>

                {/* Feature Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          AI-Powered Roadmap
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          Personalized learning path based on your current skills and career goals
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Adaptive Learning
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          Real-time adjustments to match your learning pace and preferences
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Hands-On Labs
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          Safe practice environment for ethical hacking and penetration testing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left transition-colors duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Career Guidance
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                          Preparation for CEH, OSCP, CISSP certifications and job interviews
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Waitlist Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-12 sm:mt-16"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      Join the Waitlist
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Joining...
                          </span>
                        ) : (
                          "Join Waitlist"
                        )}
                      </button>
                    </form>

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-3 rounded-lg text-sm text-center ${
                          message.type === "success"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    )}
                  </div>

                  {/* Social Proof */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex -space-x-2">
                      <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-800">
                        <AvatarFallback className="bg-blue-600 text-white font-semibold">A</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-800">
                        <AvatarFallback className="bg-indigo-600 text-white font-semibold">B</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-800">
                        <AvatarFallback className="bg-cyan-600 text-white font-semibold">C</AvatarFallback>
                      </Avatar>
                      <Avatar className="w-10 h-10 border-2 border-white dark:border-gray-800">
                        <AvatarFallback className="bg-purple-600 text-white font-semibold">D</AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{waitlistCount}+</span> aspiring cybersecurity professionals already joined
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                © 2025 SOVAP. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2">
                Empowering the next generation of cybersecurity professionals
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
