'use client';
import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { MapPin, Globe, Bookmark, CreditCard, Award, Heart, Clock, Building, Calendar, Search } from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: {
    type: string;
    address: string;
  };
  type: string;
  schedule: string[];
  salary?: string;
  description: string;
  requirements: string;
  timePosted: string;
  applied?: boolean;
}

interface Filters {
  searchTerm: string;
  industry: string;
  jobType: string;
  locationType: string;
  distance: number;
  schedule: string[];
}

const StudentDashboard = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    industry: 'All Industries',
    jobType: 'all',
    locationType: 'all',
    distance: 25,
    schedule: [],
  });

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error('Error getting location:', error)
      );
    }
  }, []);

  // Fetch jobs
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobListing[];
      setJobs(jobList);
      setFilteredJobs(jobList);
    };

    fetchJobs();
    return () => unsubscribe();
  }, [router]);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3963; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Apply filters
  useEffect(() => {
    let result = [...jobs];

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    // Industry filter
    if (filters.industry !== 'All Industries') {
      result = result.filter(job => job.industry === filters.industry);
    }

    // Job type filter
    if (filters.jobType !== 'all') {
      result = result.filter(job => job.type.toLowerCase() === filters.jobType);
    }

    // Location type filter
    if (filters.locationType !== 'all') {
      result = result.filter(job => job.location.type.toLowerCase() === filters.locationType);
    }

    // Schedule filter
    if (filters.schedule.length > 0) {
      result = result.filter(job => 
        filters.schedule.some(schedule => job.schedule.includes(schedule))
      );
    }

    // Distance filter (if user location is available and job has coordinates)
    if (userLocation && filters.distance) {
      result = result.filter(job => {
        // This is a simplified version - you'd need to geocode addresses to get real coordinates
        // For now, we'll assume jobs have lat/lng properties
        if (job.location.type === 'remote') return true;
        // You would need to add actual coordinate checking here
        return true; // Placeholder
      });
    }

    setFilteredJobs(result);
  }, [filters, jobs, userLocation]);

  const categories = [
    { id: 'all', icon: <Heart size={16} />, label: 'All Jobs' },
    { id: 'remote', icon: <Globe size={16} />, label: 'Remote' },
    { id: 'local', icon: <MapPin size={16} />, label: 'Local' },
    { id: 'internship', icon: <CreditCard size={16} />, label: 'Internships' },
    { id: 'volunteering', icon: <Award size={16} />, label: 'Volunteering' },
  ];

  const industries = [
    'All Industries',
    'Technology',
    'Healthcare',
    'Education',
    'Finance',
    'Retail',
    'Manufacturing',
    'Construction',
    'Hospitality',
    'Transportation',
    'Media',
  ];

  const scheduleOptions = [
    'Full-time',
    'Part-time',
    'Morning shift',
    'Evening shift',
    'Night shift',
    'Weekends',
    'Flexible',
  ];

  const handleScheduleToggle = (schedule: string) => {
    setFilters(prev => ({
      ...prev,
      schedule: prev.schedule.includes(schedule)
        ? prev.schedule.filter(s => s !== schedule)
        : [...prev.schedule, schedule]
    }));
  };

  const formatTimePosted = (timestamp: string) => {
    const posted = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - posted.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return posted.toLocaleDateString();
  };

  return (
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
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Job card content remains the same */}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;