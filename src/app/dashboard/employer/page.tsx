'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

interface JobData {
  id?: string;
  title: string;
  company: string;
  industry: string;
  description: string;
  requirements: string;
  location: {
    type: string;
    address: string;
  };
  type: string;
  schedule: string[];
  salary?: string;
  timePosted: string;
  applied?: boolean;
}

const EmployerDashboard = () => {
  const router = useRouter();
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    company: '',
    industry: '',
    description: '',
    requirements: '',
    location: {
      type: '',
      address: ''
    },
    type: '',
    schedule: [],
    salary: '',
    timePosted: new Date().toISOString(),
    applied: false
  });

  const industries = [
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
    'Other'
  ];

  const jobTypes = [
    'Temp-to-hire',
    'Full-time',
    'Contract',
    'Temporary',
    'Part-time',
    'Internship',
    'Volunteering'
  ];

  const scheduleOptions = [
    'Overtime',
    '4 hour shift',
    '8 hour shift',
    '10 hour shift',
    '12 hour shift',
    'Morning shift',
    'Day shift',
    'Evening shift',
    'Night shift',
    'Overnight shift',
    'Rotating shift',
    'Monday to Friday',
    'Weekends as needed',
    'Weekends only',
    'No weekends',
    'Every weekend',
    'Rotating weekends',
    '3x12',
    '4x10',
    '4x12',
    '5x8',
    'Nights as needed',
    'Extended hours'
  ];

  const handleScheduleChange = (option: string) => {
    setJobData(prev => ({
      ...prev,
      schedule: prev.schedule.includes(option)
        ? prev.schedule.filter(item => item !== option)
        : [...prev.schedule, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobId = `${jobData.company}-${jobData.title}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-');
    const jobRef = doc(db, 'jobs', jobId);
    
    try {
      await setDoc(jobRef, {
        ...jobData,
        id: jobId,
        timePosted: new Date().toISOString(),
      });

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobData }),
      });

      if (response.ok) {
        alert('Job posted successfully!');
        setJobData({
          title: '',
          company: '',
          industry: '',
          description: '',
          requirements: '',
          location: { type: '', address: '' },
          type: '',
          schedule: [],
          salary: '',
          timePosted: new Date().toISOString(),
          applied: false
        });
      }
    } catch (error) {
      alert('Error posting job. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post a Job</h1>
          <p className="text-lg text-gray-600">Share your opportunity with qualified candidates</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={jobData.company}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, company: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={jobData.industry}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, industry: e.target.value})}
                required
              >
                <option value="">Select Industry</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={jobData.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`px-4 py-2 rounded-full border ${
                      jobData.type === type 
                      ? 'bg-blue-100 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() => setJobData({...jobData, type})}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <div className="flex flex-wrap gap-2">
                {scheduleOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    className={`px-4 py-2 rounded-full border ${
                      jobData.schedule.includes(option)
                      ? 'bg-blue-100 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onClick={() => handleScheduleChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
              <select
                value={jobData.location.type}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, location: {...jobData.location, type: e.target.value}})}
                required
              >
                <option value="">Select Location Type</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Physical Address</label>
              <input
                type="text"
                value={jobData.location.address}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, location: {...jobData.location, address: e.target.value}})}
                placeholder="Enter full address (required for on-site/hybrid positions)"
                required={jobData.location.type !== 'remote'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary/Compensation</label>
              <input
                type="text"
                value={jobData.salary}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                placeholder="e.g., $15/hour, $40,000/year, Unpaid"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={jobData.description}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
              <textarea
                value={jobData.requirements}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;