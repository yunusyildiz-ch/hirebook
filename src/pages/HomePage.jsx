import { useState } from "react";
import { motion } from "framer-motion";
import {
  Apple,
  MonitorDown,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
} from "lucide-react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import QatipLogo from "../assets/QatipLogo";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 dark:bg-gray-900 text-gray-800 dark:text-white"
    >
      {/* Left: Info Section */}
      <div className="flex items-center justify-center px-8 py-8">
        <div className="space-y-6 max-w-lg w-full">
          {/* Logo */}
          <QatipLogo />

          <h2 className="text-2xl font-bold">
            Welcome to your all-in-one hiring assistant!
          </h2>

          <p>
            Track candidates, manage tasks, and organize HR notes in one sleek,
            intuitive app.
          </p>
          <p>
            Built for recruiters, startups, and HR pros who want clarity and
            control.
          </p>

          <ul className="space-y-2 list-disc list-inside">
            <li>📁 Candidate & Task Management</li>
            <li>📝 Structured Note-Taking for Interviews</li>
            <li>📊 Easy Progress Tracking</li>
            <li>🔐 Secure & Private</li>
            <li>🌙 Light/Dark Mode Support</li>
          </ul>

          <div className="space-y-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              <Apple size={18} /> Download for Mac
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <MonitorDown size={18} /> Download for Windows
            </a>
          </div>

          <footer className="pt-10 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex gap-4 items-center mb-2">
              <a href="#" className="hover:text-blue-500">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-sky-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-blue-700">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                <Github size={18} />
              </a>
            </div>
            © {new Date().getFullYear()} HiReBOOK — Built with ❤️
          </footer>
        </div>
      </div>

      {/* Right: Auth Panel */}
      <div className="flex items-center justify-center p-8 bg-white/80 dark:bg-gray-800">
        <div className="space-y-4 w-full max-w-xs">
          <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg hover:opacity-90 transition">
            <Apple size={18} /> Sign up with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            <ArrowRight size={18} /> Sign up with Google
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
              or
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <button
            onClick={() => setShowRegister(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>

          <div className="text-center mt-4">
            <p className="text-sm dark:text-gray-300">
              Already have an account?
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="mt-1 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && (
        <RegisterModal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
        />
      )}
    </motion.div>
  );
}
