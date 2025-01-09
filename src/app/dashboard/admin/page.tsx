'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface JobListing {
  id: string;
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
  status: 'pending' | 'approved' | 'rejected';
  timePosted: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAndFetchJobs = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          router.push('/login');
          return;
        }

        // Check if user is admin
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists() || userDoc.data()?.role !== 'admin') {
          router.push('/');
          return;
        }

        // Fetch pending jobs
        const jobsQuery = query(
          collection(db, 'jobs'),
          where('status', '==', 'pending')
        );
        
        const querySnapshot = await getDocs(jobsQuery);
        const jobsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JobListing[];
        
        setJobs(jobsList);
      } catch (err) {
        console.error('Error:', err);
        setError('Error fetching jobs');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchJobs();
  }, [router]);

  const handleJobAction = async (jobId: string, action: 'approve' | 'reject') => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      if (action === 'approve') {
        await updateDoc(jobRef, { status: 'approved' });
      } else {
        await updateDoc(jobRef, { status: 'rejected' });
      }
      
      // Update local state
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error updating job:', err);
      setError('Error updating job status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Job Approvals</h2>
            {jobs.length === 0 ? (
              <p>No pending jobs to review</p>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <h3 className="text-lg font-medium">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500 mt-2">{job.description}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleJobAction(job.id, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleJobAction(job.id, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 