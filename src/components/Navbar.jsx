import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogIn, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onOpenAuth }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600';
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'Admin') return '/admin-dashboard';
    if (user.role === 'Recruiter') return '/recruiter-dashboard';
    return '/jobseeker-dashboard';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              JobSphere
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/jobs" className={`transition-colors ${isActive('/jobs')}`}>Find Jobs</Link>
            <Link to="/about" className={`transition-colors ${isActive('/about')}`}>About Us</Link>
            <Link to="/career-guide" className={`transition-colors ${isActive('/career-guide')}`}>Career Guide</Link>
            <Link to="/contact" className={`transition-colors ${isActive('/contact')}`}>Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={getDashboardLink()} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium">
                   <User className="w-5 h-5"/>
                   <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full shadow-md shadow-indigo-200 transition-all active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span className="font-medium">Login / Register</span>
              </button>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
