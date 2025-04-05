import { Link } from "react-router-dom";
import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Globe,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Left: Scrollable Info Section */}
      <div className="overflow-y-auto h-screen px-8 py-12 space-y-10">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          HiReBOOK
        </h1>

        <p className="text-lg">
          Welcome to HiReBOOK — your all-in-one hiring assistant!
        </p>
        <p>
          Track your candidates, manage tasks, and store HR-related notes — all
          in one clean, fast and user-friendly interface.
        </p>
        <p>
          Whether you're a solo recruiter, part of a startup, or an HR pro,
          HiReBOOK helps you stay organized and focused.
        </p>
        <p>
          Our platform provides an intuitive dashboard, smart candidate
          tracking, and powerful note-taking features tailored for recruitment
          workflows.
        </p>
        <p>
          Built with performance and privacy in mind, HiReBOOK ensures your data
          stays secure while you focus on hiring the right talent.
        </p>
        <p>
          💡 More features coming soon — including mobile app downloads for
          Windows, Mac, iOS, and Android. Stay tuned for our public launch and
          feature announcements!
        </p>
        <p>
          Want to collaborate? We are working on a team-based collaboration
          mode, where multiple HR members can track shared applicants in
          real-time.
        </p>
        <p>
          Looking for API integrations? We’ve got you covered! Future releases
          will include integrations with LinkedIn, Gmail, Slack, and more.
        </p>

        <div className="mt-12 space-x-4">
          <a
            href="#"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            Learn more
          </a>
          <a
            href="#"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 pt-10 flex-wrap text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-blue-600">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-sky-400">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-pink-500">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-blue-700">
            <Linkedin size={20} />
          </a>
          <a href="#" className="hover:text-gray-800 dark:hover:text-white">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-green-600">
            <Globe size={20} />
          </a>
        </div>

        <footer className="pt-16 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} HiReBOOK — Built with ❤️ for modern hiring
          teams.
        </footer>
      </div>

      {/* Right: Fixed Auth Box */}
      <div className="flex flex-col justify-center items-center px-8 py-12 bg-gray-100 dark:bg-gray-800 h-screen">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Ready to get started?
        </h2>

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