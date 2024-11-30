import { BriefcaseIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container">
        <div className="grid gap-8 py-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BriefcaseIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">Cowema Jobs</span>
            </div>
            <p className="text-sm">
              Connecting talent with opportunities across Congo-Brazzaville through our innovative skill-matching platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs/find" className="hover:text-blue-500">Find Jobs</Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-blue-500">Companies</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500">Contact</Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="hover:text-blue-500">Create Account</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-blue-500">Upload Resume</Link>
              </li>
              <li>
                <Link href="/jobs/find" className="hover:text-blue-500">Job Search</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-500">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="hover:text-blue-500">Post a Job</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-500">Pricing</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-500">Resources</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500">Contact Sales</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-500">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-blue-500">Cookie Policy</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Cowema Jobs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}