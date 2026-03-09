import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter } from 'lucide-react';

const JobCard = ({ job }) => {
  // Utility for time ago
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <Link to={`/job/${job._id}`} className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          {/* Placeholder Logo */}
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
            <p className="text-gray-500 font-medium">{job.company}</p>
          </div>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">{job.employmentType}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1.5" /> {job.location}
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1.5" /> ${job.salary.toLocaleString()}/yr
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1.5" /> {timeAgo(job.createdAt)}
        </div>
      </div>

      <div className="flex gap-2">
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{job.category}</span>
      </div>
    </Link>
  );
};

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState({
    employmentType: '',
    category: ''
  });
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = `/jobs?page=${page}&limit=10`;
      if (keyword) url += `&keyword=${keyword}`;
      if (filters.employmentType) url += `&employmentType=${filters.employmentType}`;
      if (filters.category) url += `&category=${filters.category}`;

      const res = await axios.get(url);
      setJobs(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Adding debounce effect for search/filters could be better, but simple re-fetch works for demo
    const timer = setTimeout(() => {
      fetchJobs();
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword, filters, page]);

  const clearFilters = () => {
    setFilters({ employmentType: '', category: '' });
    setKeyword('');
    setPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Search */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Next Role</h1>
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center">
            <div className="pl-4">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by job title or company..."
              className="w-full bg-transparent border-none py-3 px-4 focus:ring-0 text-gray-800 outline-none"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition ml-2 shrink-0">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-indigo-600" /> Filters
                </h2>
                <button onClick={clearFilters} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">
                  Clear All
                </button>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Job Type</h3>
                <div className="space-y-3">
                  {['Full Time', 'Part Time', 'Internship'].map(type => (
                    <label key={type} className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer transition">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        checked={filters.employmentType === type}
                        onChange={(e) => setFilters({ ...filters, employmentType: e.target.value })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                      />
                      <span className="ml-3 font-medium text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Category</h3>
                <div className="space-y-3">
                  {['Technology', 'Marketing', 'Design', 'Sales', 'Finance'].map(cat => (
                    <label key={cat} className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer transition">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={filters.category === cat}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                      />
                      <span className="ml-3 font-medium text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="mt-6 font-medium text-indigo-600 hover:text-indigo-800 transition">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {jobs.map(job => (
                  <JobCard key={job._id} job={job} />
                ))}

                {/* Pagination */}
                <div className="flex justify-center gap-2 pt-8">
                  <button
                    disabled={!pagination.prev}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg">
                    Page {page}
                  </span>
                  <button
                    disabled={!pagination.next}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
