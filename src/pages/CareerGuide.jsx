import React from 'react';
import { BookOpen, FileText, Target, PlayCircle } from 'lucide-react';

const CareerGuide = () => {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-24">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-6">Career Resources Hub</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Expert advice, tips, and strategies to help you land your dream job and grow in your career.</p>
         </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 hover:border-indigo-200 transition">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-indigo-600">
                 <FileText className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Tips</h2>
              <p className="text-gray-600 mb-4">Learn how to write a resume that gets past ATS systems and grabs the recruiter's attention. Focus on achievements rather than responsibilities.</p>
              <ul className="space-y-3 mb-8">
                 <li className="flex items-start"><div className="bg-indigo-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Use action verbs to describe past roles.</span></li>
                 <li className="flex items-start"><div className="bg-indigo-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Keep formatting simple and readable.</span></li>
                 <li className="flex items-start"><div className="bg-indigo-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Quantify your impact with numbers.</span></li>
              </ul>
              <button className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center">Read full guide <PlayCircle className="w-4 h-4 ml-2" /></button>
            </div>

            <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 hover:border-indigo-200 transition">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-purple-600">
                 <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interview Strategies</h2>
              <p className="text-gray-600 mb-4">Master the STAR method for behavioral questions and prepare effectively for technical rounds. Confidence is key.</p>
              <ul className="space-y-3 mb-8">
                 <li className="flex items-start"><div className="bg-purple-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Research the company culture extensively.</span></li>
                 <li className="flex items-start"><div className="bg-purple-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Prepare thoughtful questions for the interviewer.</span></li>
                 <li className="flex items-start"><div className="bg-purple-600 w-1.5 h-1.5 rounded-full mt-2 mr-2 shrink-0"></div><span className="text-gray-700">Send a thank-you note within 24 hours.</span></li>
              </ul>
              <button className="text-purple-600 font-semibold hover:text-purple-800 flex items-center">Read full guide <PlayCircle className="w-4 h-4 ml-2" /></button>
            </div>

         </div>
      </section>
    </div>
  );
};

export default CareerGuide;
