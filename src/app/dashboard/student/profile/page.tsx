'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  age: string;
  grade: string;
  awards: string;
  about: string;
  resume: string;
}

export default function Profile() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.push('/login');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          setError('User data not found');
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Error loading profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Profile</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <p><strong>Name:</strong> {userProfile?.name}</p>
        <p><strong>Email:</strong> {userProfile?.email}</p>
        <p><strong>Age:</strong> {userProfile?.age}</p>
        <p><strong>Grade:</strong> {userProfile?.grade}</p>
        <p><strong>Awards:</strong> {userProfile?.awards}</p>
        <p><strong>About Me:</strong> {userProfile?.about}</p>
        {userProfile?.resume && (
          <p>
            <strong>Resume:</strong>{' '}
            <a href={userProfile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              View Resume
            </a>
          </p>
        )}
      </div>
    </div>
  );
}