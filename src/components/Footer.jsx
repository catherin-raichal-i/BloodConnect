import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">BloodConnect</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting blood donors with recipients to save lives. Every donation matters,
              and together we can make a difference in our community.
            </p>
            <div className="text-sm text-gray-400">
              <p className="mb-1">Emergency Helpline: <span className="text-red-400 font-semibold">1-800-DONATE</span></p>
              <p>Available 24/7 for urgent blood requests</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/donors" className="text-gray-300 hover:text-red-400 transition-colors">Find Donors</Link></li>
              <li><Link to="/requests" className="text-gray-300 hover:text-red-400 transition-colors">Blood Requests</Link></li>
              <li><Link to="/blood-banks" className="text-gray-300 hover:text-red-400 transition-colors">Blood Banks</Link></li>
              <li><Link to="/education" className="text-gray-300 hover:text-red-400 transition-colors">Education</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-red-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">info@bloodconnect.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="text-gray-300">123 Health Ave, Medical District</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BloodConnect. All rights reserved. Saving lives together.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* <Link to="/faq" className="text-gray-400 hover:text-red-400 text-sm transition-colors">FAQ</Link> */}

              <HashLink smooth to="/#privacy-policy" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Privacy Policy
              </HashLink>
              <HashLink smooth to="/#terms-of-service" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Terms of Service
              </HashLink>
              <HashLink smooth to="/#faq" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                FAQ
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
