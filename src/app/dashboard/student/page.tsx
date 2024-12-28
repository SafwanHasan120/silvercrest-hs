'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
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

    // Fetch all jobs from Firestore
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JobListing[];
      setJobs(jobList);
    };

    fetchJobs();
    return () => unsubscribe();
  }, [router]);

  return (
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
      </div>
    </div>
  );
};

export default StudentDashboard; 