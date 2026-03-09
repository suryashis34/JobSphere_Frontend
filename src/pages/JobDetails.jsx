import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Clock, Building, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resume, setResume] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        toast.error('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error('Please upload your resume');
    
    setApplying(true);
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      await axios.post(`/jobs/${id}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Successfully applied for the job!');
      setShowApplyModal(false);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to apply. You might have already applied.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!job) return (
    <div className="min-h-[70vh] flex justify-center items-center text-xl text-gray-500">
      Job not found.
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full opacity-50 z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 font-bold text-3xl shrink-0">
                {job.company.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-lg text-gray-600 font-medium">{job.company}</p>
              </div>
            </div>
            
            <div className="shrink-0">
               {user?.role === 'Jobseeker' ? (
                 <button 
                   onClick={() => setShowApplyModal(true)}
                   className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors w-full md:w-auto"
                 >
                   Apply Now
                 </button>
               ) : user ? (
                 <button disabled className="bg-gray-200 text-gray-500 font-bold py-3 px-8 rounded-xl cursor-not-allowed">
                   Log in as Jobseeker to apply
                 </button>
               ) : (
                 <button disabled className="bg-indigo-100 text-indigo-400 font-bold py-3 px-8 rounded-xl cursor-not-allowed">
                   Log in to apply
                 </button>
               )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-t border-gray-100 pt-6 relative z-10">
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <MapPin className="w-5 h-5 mr-2 text-indigo-600" /> <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <DollarSign className="w-5 h-5 mr-2 text-indigo-600" /> <span className="font-medium">${job.salary.toLocaleString()} / year</span>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <Briefcase className="w-5 h-5 mr-2 text-indigo-600" /> <span className="font-medium">{job.employmentType}</span>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" /> <span className="font-medium">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
             <CheckCircle className="w-6 h-6 mr-3 text-indigo-600" /> Job Description
           </h2>
           <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
             {job.description || "No detailed description provided for this role."}
           </div>
        </div>

      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h2>
            <p className="text-gray-500 mb-6">Do you want to apply for this job at {job.company}? Please upload your latest resume.</p>
            
            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF only)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">{resume ? resume.name : 'PDF up to 5MB'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={applying}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {applying ? 'Applying...' : 'Yes, Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default JobDetails;
