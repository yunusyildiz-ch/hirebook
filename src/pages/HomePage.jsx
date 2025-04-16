import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import LoginModal from "@modals/LoginModal";
import RegisterModal from "@modals/RegisterModal";
import QatipLogo from "@assets/QatipLogo";
import QatipCatLogo from "@assets/QatipCatLogo";
import ThemeToggle from "@components/ThemeToggle";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill } from "react-icons/ri";
import { useGoogleLogin } from "@hooks/useGoogleLogin";
import DownloadSection from "@components/ui/DownloadSection";
import MobilAppStoreBadges from "@assets/MobilAppStoreBadges";
import ComingSoonModal from "@modals/ComingSoonModal";
import CookieBanner from "@components/CookieBanner";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { handleGoogleLogin } = useGoogleLogin();

  useEffect(() => {
    document.body.style.overflow =
      showLogin || showRegister ? "hidden" : "auto";
  }, [showLogin, showRegister]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="h-screen overflow-y-auto relative flex flex-col md:grid md:grid-cols-2 dark:bg-gray-900 text-gray-800 dark:text-white"
    >
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* QatipLogo - Mobile only */}
      <div className="flex justify-center mt-4 md:hidden order-1">
        <QatipLogo />
      </div>

      {/* Info Section */}
      <div className="order-3 md:order-first flex items-center justify-center px-8 py-8">
        <div className="space-y-6 max-w-lg w-full">
          {/* QatipLogo - Desktop only */}
          <div className="hidden md:flex justify-center mb-6">
            <QatipLogo />
          </div>

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

          {/* Download Section */}
          <DownloadSection onComingSoon={() => setShowComingSoon(true)} />

          {/* Footer */}
          <footer className="pt-10 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex gap-4 items-center mb-2">
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-400">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                <Github size={18} />
              </a>
            </div>
            © {new Date().getFullYear()} Qatip App — Built with ❤️
          </footer>
        </div>
      </div>

      {/* Auth Box */}
      <div className="order-2 md:order-last flex items-center justify-center px-6 py-8 mt-8 md:mt-0">
        <div className="space-y-4 w-full max-w-xs bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl rounded-2xl p-6">
          <div className="flex justify-center mb-4">
            <QatipCatLogo className="w-16 h-16 text-gray-900 dark:text-white" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 
              border border-gray-300 dark:border-gray-600 
              bg-transparent hover:bg-blue-400 dark:hover:bg-white/10 
              text-black dark:text-white hover:text-white 
              py-2 rounded-lg transition"
          >
            <FcGoogle size={24} /> Continue with Google
          </button>

          <button
            type="button"
            onClick={() => setShowComingSoon(true)}
            className="w-full flex items-center justify-center gap-2 
              bg-black text-white 
              px-4 py-2 rounded-lg border border-gray-600 
              hover:bg-gray-800  transition-colors duration-200"
          >
            <RiAppleFill size="24" /> Continue with Apple
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
              or
            </span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <button
            type="button"
            onClick={() => setShowRegister(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By signing up, you agree to our{" "}
            <a
              href="/legal/terms"
              className="underline text-primary hover:text-navyBlue dark:hover:text-blue-400  dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/legal/privacy"
              className="underline text-primary hover:text-navyBlue dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            , including{" "}
            <a
              href="/legal/cookies"
              className="underline text-primary hover:text-navyBlue dark:hover:text-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Use
            </a>
            .
          </p>

          <div className="text-center mt-4">
            <p className="text-sm font-bold dark:text-gray-300">
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="mt-1 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </div>
          <MobilAppStoreBadges />
        </div>
      </div>
      <CookieBanner />
      {/* Modals */}
      {showComingSoon && (
        <ComingSoonModal
          isOpen={showComingSoon}
          onClose={() => setShowComingSoon(false)}
        />
      )}
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
