import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Briefcase, MapPin, Calendar, Clock, Download, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const JobseekerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('/applications/me');
      setApplications(res.data.data);
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this application?')) {
      try {
        await axios.delete(`/applications/${id}`);
        toast.success('Application cancelled successfully');
        fetchApplications();
      } catch (err) {
        toast.error('Failed to cancel application');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-200 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Accepted</span>;
      case 'Rejected':
        return <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full border border-red-200 flex items-center gap-1"><XCircle className="w-3 h-3"/> Rejected</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-200 flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>;
    }
  };

  if (loading) return <div className="min-h-screen flex text-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user?.name}</h1>
            <p className="text-gray-500 font-medium">Jobseeker Dashboard</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
           <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">My Applications</h2>
           
           {applications.length === 0 ? (
             <div className="text-center py-10">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-500">You haven't applied to any jobs. Start exploring opportunities!</p>
             </div>
           ) : (
             <div className="space-y-4">
               {applications.map((app) => (
                 <div key={app._id} className="border border-gray-100 p-6 rounded-2xl hover:border-indigo-100 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4">
                   
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                       <h3 className="text-lg font-bold text-gray-900">{app.job?.title || 'Unknown Job'}</h3>
                       {getStatusBadge(app.status)}
                     </div>
                     <p className="text-gray-600 font-medium mb-3">{app.job?.company || 'Unknown Company'}</p>
                     
                     <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1"/> {app.job?.location || 'N/A'}</span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                     </div>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={app.resume?.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl transition font-medium border border-gray-200"
                      >
                         <Download className="w-4 h-4 mr-2" /> Resume
                      </a>
                      <button 
                        onClick={() => handleCancel(app._id)}
                        className="text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition font-medium border border-red-100"
                      >
                         Cancel
                      </button>
                   </div>
                   
                 </div>
               ))}
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default JobseekerDashboard;
