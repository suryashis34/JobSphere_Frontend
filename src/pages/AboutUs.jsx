import React from 'react';
import { Target, Users, Zap, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">About JobSphere</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to bridge the gap between world-class talent and leading organizations. 
            Empowering careers, accelerating growth, and building future-ready teams.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-lg transition duration-300">
             <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
             <p className="text-gray-600 leading-relaxed text-lg">
               To democratize access to great jobs and help professionals everywhere find roles where they can truly thrive and build impactful careers.
             </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-lg transition duration-300">
             <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
             <p className="text-gray-600 leading-relaxed text-lg">
               To be the world's most trusted, transparent, and innovative talent marketplace, redefining how careers are built in the digital age.
             </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold mb-16">Core Values that Drive Us</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             <div>
               <div className="bg-indigo-500/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Users className="w-10 h-10 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">People First</h3>
               <p className="text-indigo-100">Every decision we make starts with how it impacts candidates and employers.</p>
             </div>
             <div>
               <div className="bg-indigo-500/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-10 h-10 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">Continuous Growth</h3>
               <p className="text-indigo-100">We nurture learning and constantly evolve our platform to stay ahead of the curve.</p>
             </div>
             <div>
               <div className="bg-indigo-500/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Target className="w-10 h-10 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">Transparency</h3>
               <p className="text-indigo-100">Clear communication, fair algorithms, and honest feedback loop.</p>
             </div>
           </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;
