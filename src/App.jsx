import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import FindJobs from './pages/FindJobs';
import JobDetails from './pages/JobDetails';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import CareerGuide from './pages/CareerGuide';

import JobseekerDashboard from './pages/JobseekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<FindJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/career-guide" element={<CareerGuide />} />
          
          <Route path="/jobseeker-dashboard" element={<ProtectedRoute allowedRoles={['Jobseeker']}><JobseekerDashboard /></ProtectedRoute>} />
          <Route path="/recruiter-dashboard" element={<ProtectedRoute allowedRoles={['Recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>

      <Footer />
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
