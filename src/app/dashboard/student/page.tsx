'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
<<<<<<< Updated upstream
=======
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { MapPin, Globe, Bookmark, CreditCard, Award, Heart, Clock, Building, Calendar, Search } from 'lucide-react';
import { motion } from 'framer-motion';
>>>>>>> Stashed changes

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
<<<<<<< Updated upstream
=======
  requirements: string;
  timePosted: string;
  applied?: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

interface Filters {
  searchTerm: string;
  industry: string;
  jobType: string;
  locationType: string;
  distance: number;
  schedule: string[];
>>>>>>> Stashed changes
}

const StudentDashboard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    // Fetch all jobs (replace with your actual data fetching logic)
    const fetchJobs = async () => {
<<<<<<< Updated upstream
      // Temporary dummy data
      const dummyJobs = [
        {
          id: "1",
          title: "Junior Web Developer Intern",
          company: "TechCorp Solutions",
          location: "Remote",
          type: "Internship",
          description: "Looking for a passionate student interested in learning web development."
        },
        // Add more dummy jobs as needed
      ];
      setJobs(dummyJobs);
=======
      try {
        const jobsQuery = query(
          collection(db, 'jobs'),
          where('status', '==', 'approved')
        );
        const jobSnapshot = await getDocs(jobsQuery);
        const jobList = jobSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JobListing[];
        setJobs(jobList);
        setFilteredJobs(jobList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
>>>>>>> Stashed changes
    };

    fetchJobs();
    return () => unsubscribe();
  }, []);

  const JobCard = ({ job, index }: { job: JobListing; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Building size={24} className="text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <p className="text-indigo-600">{job.company}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {job.industry}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.type}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {job.location.type}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <MapPin size={14} />
                  {job.location.address || 'Remote'}
                </div>
                {job.salary && (
                  <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                    <CreditCard size={14} />
                    {job.salary}
                  </div>
                )}
                <div className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                  <Clock size={14} />
                  {formatTimePosted(job.timePosted)}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Apply
              </button>
              <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
            className="mt-4 text-indigo-600 text-sm hover:text-indigo-800"
          >
            {expandedJob === job.id ? 'Show Less' : 'Show More'}
          </button>
          
          {expandedJob === job.id && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Schedule</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.schedule.map((item) => (
                    <span key={item} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Description</h4>
                <p className="mt-2 text-gray-700">{job.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Requirements</h4>
                <p className="mt-2 text-gray-700">{job.requirements}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Opportunities</h1>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-blue-600 mb-2">{job.company}</p>
                <div className="flex gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply
                </button>
                <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
=======
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs by title, company, or keywords..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilters(prev => ({ ...prev, jobType: category.id }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  filters.jobType === category.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.industry}
              onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            <select
              value={filters.locationType}
              onChange={(e) => setFilters(prev => ({ ...prev, locationType: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Distance (for local jobs)</label>
              <input
                type="range"
                min="1"
                max="50"
                value={filters.distance}
                onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 mile</span>
                <span>{filters.distance} miles</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Schedule Preferences</label>
            <div className="flex flex-wrap gap-2">
              {scheduleOptions.map(schedule => (
                <button
                  key={schedule}
                  onClick={() => handleScheduleToggle(schedule)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.schedule.includes(schedule)
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  } border`}
                >
                  {schedule}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-gray-600">{filteredJobs.length} jobs found</p>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default StudentDashboard; 