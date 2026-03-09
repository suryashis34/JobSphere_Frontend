import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-50/50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-6">
                Over 10,000+ Active Jobs
              </span>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Dream Job</span> Today
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top companies, uncover exclusive opportunities, and take the next leap in your career journey with JobSphere.
              </p>
              <Link to="/jobs"><button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl px-16 py-4 rounded-xl font-semibold transition-colors shadow-md my-auto h-full">
                Get Started
              </button></Link>
              <Link to="/contact"><button className=" hover:bg-indigo-600 text-indigo-600 hover:text-white border-indigo-600 border-2 text-xl px-6 ml-4 py-4 rounded-xl font-semibold transition-colors shadow-md my-auto h-full">
                lets chat
              </button></Link>
            </div>

            <div className="relative hidden lg:block">
              {/* Illustration Placeholder - Using CSS shapes creatively as modern stand-in for royalty free image */}
              <div className="w-full h-[500px]  rounded-[3rem] p-8 relative">
                <div className="absolute top-10 -left-8 bg-white p-4 rounded-2xl shadow-xl animate-float">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Application Sent</p>
                      <p className="font-bold text-gray-900">Google Inc.</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-20 -right-8 bg-white p-5 rounded-2xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Interview Scheduled</p>
                    <p className="font-bold text-gray-900 text-lg">Product Designer</p>
                    <p className="text-indigo-600 font-semibold">Tomorrow, 10:00 AM</p>
                  </div>
                </div>

                <div className="w-full h-full border-4 border-dashed border-indigo-200 rounded-[1rem] flex flex-col items-center justify-center text-center">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                    alt="Team collaborating in an office"
                    className="rounded-xl object-cover w-full h-[300px] sm:h-[400px] lg:h-[520px] shadow-inner"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">25k+</div>
              <div className="text-gray-500 font-medium">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-500 font-medium">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">500k+</div>
              <div className="text-gray-500 font-medium">Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">120+</div>
              <div className="text-gray-500 font-medium">Countries</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
