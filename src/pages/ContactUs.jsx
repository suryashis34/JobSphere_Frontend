import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
           <p className="text-xl text-gray-600">Have questions about JobSphere? Want to report an issue or suggest a feature? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                 <Mail className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
               <p className="text-gray-600 mb-4">Our team typically responds within 2 hours during business operations.</p>
               <a href="mailto:support@jobsphere.com" className="text-indigo-600 font-semibold hover:underline">support@jobsphere.com</a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                 <Phone className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
               <p className="text-gray-600 mb-4">We're available Mon-Fri, 9am - 6pm EST.</p>
               <p className="text-indigo-600 font-semibold">+1 (555) 123-4567</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                 <MapPin className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
               <p className="text-gray-600">
                 100 Innovation Drive<br/>
                 Tech Park, NY 10001<br/>
                 United States
               </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
               <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                     <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition" placeholder="John" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                     <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition" placeholder="Doe" />
                   </div>
                 </div>
                 
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                   <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition" placeholder="john@example.com" />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                   <textarea rows="5" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition resize-none" placeholder="How can we help you?"></textarea>
                 </div>

                 <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition w-full shadow-md">
                   Send Message
                 </button>
               </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
