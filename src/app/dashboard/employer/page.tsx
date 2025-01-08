'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
<<<<<<< Updated upstream
=======
import { db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

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
  status?: 'pending' | 'approved' | 'rejected';
}
>>>>>>> Stashed changes

const EmployerDashboard = () => {
  const router = useRouter();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    type: '',
    requirements: ''
  });

<<<<<<< Updated upstream
  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit job posting
    console.log('Job posting:', jobData);
=======
  const [postedJobs, setPostedJobs] = useState<JobData[]>([]);

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

  const { toast } = useToast();

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
      const newJobData = {
        ...jobData,
        id: jobId,
        status: 'pending' as const,
        timePosted: new Date().toISOString(),
      };

      await setDoc(jobRef, newJobData);

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobData: newJobData }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Job posted successfully and is pending admin approval.",
          variant: "success",
        });

        const formElement = e.target as HTMLFormElement;
        formElement.reset();
        
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
          status: 'pending',
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
      console.error('Error:', error);
    }
>>>>>>> Stashed changes
  };

  useEffect(() => {
    const fetchEmployerJobs = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.push('/login');
        return;
      }

      try {
        const jobsQuery = query(
          collection(db, 'jobs'),
          where('company', '==', jobData.company)
        );
        const querySnapshot = await getDocs(jobsQuery);
        const jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JobData[];
        setPostedJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchEmployerJobs();
  }, [jobData.company, router]);

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setJobData({...jobData, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setJobData({...jobData, location: e.target.value})}
            >
              <option value="">Select Location</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setJobData({...jobData, type: e.target.value})}
            >
              <option value="">Select Type</option>
              <option value="internship">Internship</option>
              <option value="part-time">Part-time</option>
              <option value="full-time">Full-time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              onChange={(e) => setJobData({...jobData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
=======
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post a Job</h1>
          <p className="text-lg text-gray-600">Share your opportunity with qualified candidates</p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Post Job
            </motion.button>
          </form>
        </motion.div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Posted Jobs</h2>
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'approved' ? 'bg-green-100 text-green-800' :
                        job.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Posted: {new Date(job.timePosted).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
>>>>>>> Stashed changes
  );
};

export default EmployerDashboard; 