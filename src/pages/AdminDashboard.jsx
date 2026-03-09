import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Users, Briefcase, FileText, Slash, CheckCircle, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users'); // users, jobs, applications
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let endpoint = '';
      if (tab === 'users') endpoint = '/users';
      if (tab === 'jobs') endpoint = '/jobs'; // Note: backend getJobs handles admin role properly (shows archived if admin)
      if (tab === 'applications') endpoint = '/applications';
      
      const res = await axios.get(endpoint);
      setDataList(res.data.data);
    } catch (err) {
      toast.error(`Failed to load ${tab}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const handleArchiveJob = async (id) => {
    if (window.confirm('Are you sure you want to archive this job? It will be hidden from public.')) {
      try {
        await axios.put(`/jobs/${id}/archive`);
        toast.success('Job archived successfully');
        fetchData('jobs');
      } catch (err) {
        toast.error('Failed to archive job');
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
               A
             </div>
             <div>
               <h1 className="text-3xl font-bold text-gray-900 mb-1">System Admin</h1>
               <p className="text-gray-500 font-medium">Platform Management Dashboard</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          
          <div className="flex space-x-4 border-b border-gray-100 mb-6">
             <button 
               onClick={() => setActiveTab('users')} 
               className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
             >
               <Users className="w-4 h-4 inline-block mr-2" /> Users
             </button>
             <button 
               onClick={() => setActiveTab('jobs')} 
               className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'jobs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
             >
               <Briefcase className="w-4 h-4 inline-block mr-2" /> Jobs
             </button>
             <button 
               onClick={() => setActiveTab('applications')} 
               className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${activeTab === 'applications' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
             >
               <FileText className="w-4 h-4 inline-block mr-2" /> Applications
             </button>
          </div>

          {loading ? (
             <div className="py-20 text-center text-gray-500">Loading data...</div>
          ) : (
            <div className="overflow-x-auto">
              
              {activeTab === 'users' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 font-semibold text-gray-600">ID</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Name</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Email</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Role</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map(item => (
                      <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-500 font-mono">{item._id.substring(item._id.length - 6)}</td>
                        <td className="py-4 px-4 font-bold text-gray-900">{item.name}</td>
                        <td className="py-4 px-4 text-gray-600">{item.email}</td>
                        <td className="py-4 px-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.role === 'Admin' ? 'bg-red-100 text-red-700' : item.role === 'Recruiter' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                             {item.role}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'jobs' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 font-semibold text-gray-600">Job Title</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Company</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Posted By</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Status</th>
                      <th className="py-4 px-4 font-semibold text-gray-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map(item => (
                      <tr key={item._id} className={`border-b border-gray-100 hover:bg-gray-50 ${item.isArchived ? 'opacity-60 bg-gray-50' : ''}`}>
                        <td className="py-4 px-4 font-bold text-gray-900">{item.title}</td>
                        <td className="py-4 px-4 text-gray-600">{item.company}</td>
                        <td className="py-4 px-4 text-gray-600 text-sm">{item.postedBy?.name || 'Unknown'}</td>
                        <td className="py-4 px-4">
                           {item.isArchived ? (
                             <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-700">Archived</span>
                           ) : (
                             <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Active</span>
                           )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          {!item.isArchived && (
                            <button onClick={() => handleArchiveJob(item._id)} className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-200 text-sm font-semibold inline-flex items-center">
                              <Slash className="w-3 h-3 mr-1" /> Soft Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'applications' && (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 font-semibold text-gray-600">JobTitle / Company</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Applicant</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Status</th>
                      <th className="py-4 px-4 font-semibold text-gray-600">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map(item => (
                      <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                           <p className="font-bold text-gray-900">{item.job?.title || 'Unknown'}</p>
                           <p className="text-sm text-gray-500">{item.job?.company || 'Unknown'}</p>
                        </td>
                        <td className="py-4 px-4">
                           <p className="font-semibold text-gray-800">{item.applicant?.name || 'Unknown'}</p>
                           <p className="text-xs text-gray-500">{item.applicant?.email}</p>
                        </td>
                        <td className="py-4 px-4">
                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : item.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {item.status}
                           </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm">{new Date(item.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {dataList.length === 0 && (
                 <div className="py-12 text-center text-gray-500">No {activeTab} found in the system.</div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
