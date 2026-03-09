import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                JobSphere
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Connecting talented professionals with world-class opportunities. Your next career move starts here.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-indigo-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a className="text-gray-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a className="text-gray-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a className="text-gray-400 hover:text-indigo-600 transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Candidates</h3>
            <ul className="space-y-3">
              <li><Link to="/jobs" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Browse Jobs</Link></li>
              <li><Link to="/career-guide" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Career Guide</Link></li>
              <li><Link to="/career-guide" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Resume Tips</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li><a className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Post a Job</a></li>
              <li><a className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Browse Candidates</a></li>
              <li><a className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Contact Us</Link></li>
              <li><a className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} JobSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
