import { Link } from "react-router-dom";
import { ArrowRight, Apple, MonitorDown, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Left: Static Info Section */}
      <div className="px-8 py-12 space-y-10">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">HiReBOOK</h1>
        <p className="text-lg">
          Welcome to HiReBOOK — your all-in-one hiring assistant!
        </p>
        <p>
          Track candidates, manage tasks, and organize HR notes in one sleek, intuitive app.
        </p>
        <p>
          Built for recruiters, startups, and HR pros who want clarity and control.
        </p>

        <ul className="space-y-2 list-disc list-inside">
          <li>📁 Candidate & Task Management</li>
          <li>📝 Structured Note-Taking for Interviews</li>
          <li>📊 Easy Progress Tracking</li>
          <li>🔐 Secure & Private</li>
          <li>🌙 Light/Dark Mode Support</li>
        </ul>

        <div className="space-y-4 mt-6">
          {/* Mac Download */}
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <Apple size={18} /> Download for Mac
          </a>

          {/* Windows Download */}
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <MonitorDown size={18} /> Download for Windows
          </a>
        </div>

        <footer className="pt-12 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex gap-4 items-center mb-2">
            <a href="#" target="_blank" className="hover:text-blue-500">
              <Facebook size={18} />
            </a>
            <a href="#" target="_blank" className="hover:text-sky-400">
              <Twitter size={18} />
            </a>
            <a href="#" target="_blank" className="hover:text-blue-700">
              <Linkedin size={18} />
            </a>
            <a href="#" target="_blank" className="hover:text-gray-900 dark:hover:text-white">
              <Github size={18} />
            </a>
          </div>
          © {new Date().getFullYear()} HiReBOOK — Built with ❤️
        </footer>
      </div>

      {/* Right: Fixed Auth Box (same as before) */}
      <div className="flex flex-col justify-center items-center p-8 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Ready to get started?</h2>
        <div className="space-y-4 w-full max-w-xs">
          <Link to="/login">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition">
              Login <ArrowRight size={16} />
            </button>
          </Link>
          <Link to="/register">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition">
              Register <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}