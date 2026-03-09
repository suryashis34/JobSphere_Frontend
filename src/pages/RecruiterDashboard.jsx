import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FileEdit, Trash2, PlusCircle, Users, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingApplicantsForId, setViewingApplicantsForId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '', company: '', category: 'Technology', employmentType: 'Full Time', location: '', salary: '', description: ''
  });

  const fetchJobs = async () => {
    try {
      // Recruiter only sees their jobs when filtered? The backend API GET /jobs currently gets all jobs (filtering if not admin, only approved).
      // Wait, `/api/jobs` gets all jobs. But for recruiter dashboard, they want to see THEIR posts. Wait, I didn't add a specific endpoint for `/jobs/me`.
      // I can just filter locally or add a query param. 
      // Actually, if we just GET /api/jobs without `postedBy`, we get all. Let's add `postedBy` to query if possible. 
      // Wait, MongoDB supports querying by `postedBy`.
      const res = await axios.get(`/jobs?postedBy=${user._id || user.id}`);
      setJobs(res.data.data);
    } catch (err) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/jobs', newJob);
      toast.success('Job posted successfully');
      setShowPostModal(false);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to post job');
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Delete this job? This cannot be undone.')) {
      try {
        await axios.delete(`/jobs/${id}`);
        toast.success('Job deleted');
        fetchJobs();
      } catch (err) {
        toast.error('Failed to delete job');
      }
    }
  };

  const viewApplicants = async (jobId) => {
    try {
      const res = await axios.get(`/jobs/${jobId}/applications`);
      setApplicants(res.data.data);
      setViewingApplicantsForId(jobId);
    } catch (err) {
      toast.error('Failed to load applicants');
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await axios.put(`/applications/${appId}/status`, { status });
      toast.success(`Application ${status}`);
      // Refresh current applicants list
      viewApplicants(viewingApplicantsForId);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="min-h-screen text-center p-20">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
               {user?.name?.charAt(0)}
             </div>
             <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-1">{user?.name}</h1>
               <p className="text-gray-500 font-medium">Recruiter Dashboard</p>
             </div>
          </div>
          <button 
             onClick={() => setShowPostModal(true)}
             className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center"
          >
             <PlusCircle className="mr-2 w-5 h-5" /> Post New Job
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Job Listings</h2>
           
           {jobs.length === 0 ? (
             <div className="text-center py-10">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs posted</h3>
                <p className="text-gray-500">You haven't posted any jobs yet. Start recruiting by creating a job listing.</p>
             </div>
           ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-gray-200">
                     <th className="py-4 px-4 font-semibold text-gray-600">Job Title</th>
                     <th className="py-4 px-4 font-semibold text-gray-600">Location</th>
                     <th className="py-4 px-4 font-semibold text-gray-600">Date Posted</th>
                     <th className="py-4 px-4 font-semibold text-gray-600 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {jobs.map(job => (
                     <tr key={job._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                       <td className="py-4 px-4">
                          <Link to={`/job/${job._id}`} className="font-bold text-indigo-600 hover:underline">{job.title}</Link>
                       </td>
                       <td className="py-4 px-4 text-gray-600">{job.location}</td>
                       <td className="py-4 px-4 text-gray-600">{new Date(job.createdAt).toLocaleDateString()}</td>
                       <td className="py-4 px-4 text-right flex justify-end gap-2">
                          <button onClick={() => viewApplicants(job._id)} className="bg-indigo-100 text-indigo-700 p-2 rounded-lg hover:bg-indigo-200" title="View Applicants">
                            <Users className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteJob(job._id)} className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200" title="Delete Job">
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
        </div>

        {/* Applicants Modal/Section */}
        {viewingApplicantsForId && (
          <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Applicants List</h2>
                <button onClick={() => setViewingApplicantsForId(null)} className="text-gray-500 hover:text-gray-800 font-medium text-sm">Close View</button>
             </div>
             
             {applicants.length === 0 ? (
               <div className="text-center py-6 text-gray-500">No applicants for this job yet.</div>
             ) : (
               <div className="space-y-4">
                 {applicants.map(app => (
                   <div key={app._id} className="border border-gray-100 p-5 rounded-xl block md:flex justify-between items-center">
                     <div>
                       <h3 className="font-bold text-gray-900">{app.applicant?.name}</h3>
                       <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                       <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded border ${app.status === 'Pending' ? 'text-yellow-700 border-yellow-200 bg-yellow-50' : app.status === 'Accepted' ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}>
                         Status: {app.status}
                       </span>
                     </div>
                     <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                       <a href={app.resume?.url} target="_blank" rel="noreferrer" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition">
                         Resume
                       </a>
                       {app.status === 'Pending' && (
                         <>
                           <button onClick={() => updateApplicationStatus(app._id, 'Accepted')} className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition">
                             Accept
                           </button>
                           <button onClick={() => updateApplicationStatus(app._id, 'Rejected')} className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">
                             Reject
                           </button>
                         </>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Post a New Job</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. Senior Brand Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input required type="text" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={newJob.category} onChange={e => setNewJob({...newJob, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none">
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                  <select value={newJob.employmentType} onChange={e => setNewJob({...newJob, employmentType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary ($)</label>
                  <input required type="number" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. 120000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="e.g. Remote, or New York, NY" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Details & Requirements</label>
                <textarea required rows="6" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none resize-none"></textarea>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-md">
                  Publish Job
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default RecruiterDashboard;
