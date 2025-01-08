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

<<<<<<< Updated upstream
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
=======
  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base font-medium text-gray-900">{userProfile?.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900">{userProfile?.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="text-base text-gray-900">{userProfile?.age}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Grade</p>
                  <p className="text-base text-gray-900">{userProfile?.grade}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Awards</p>
                  <p className="text-base text-gray-900">{userProfile?.awards}</p>
                </div>

                {userProfile?.resume && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">Resume</p>
                    <a
                      href={userProfile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      View Resume
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">About Me</p>
                <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">
                  {userProfile?.about}
                </p>
              </div>
            </div>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}