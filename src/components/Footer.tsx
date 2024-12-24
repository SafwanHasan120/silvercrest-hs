import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Silvercrest High</h3>
            <p className="text-gray-400 mb-4">Empowering students to build their future careers through meaningful opportunities.</p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 School Street</p>
              <p>City, State 12345</p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:contact@silvercrest.edu" className="hover:text-white">
                  contact@silvercrest.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Silvercrest High School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 