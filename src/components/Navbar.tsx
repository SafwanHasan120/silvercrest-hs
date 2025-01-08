'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
<<<<<<< Updated upstream
import { User } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isStudent, setIsStudent] = useState(false);
=======
import Image from 'next/image';
import profileImage from '@/Assets/profile.png';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState<'student' | 'company' | 'admin' | null>(null);
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDashboardClick = () => {
    switch (userRole) {
      case 'student':
        router.push('/dashboard/student');
        break;
      case 'company':
        router.push('/dashboard/employer');
        break;
      case 'admin':
        router.push('/dashboard/admin');
        break;
      default:
        router.push('/login');
    }
  };

  if (loading) return null;

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Silvercrest High
          </Link>
          
          <div className="flex items-center gap-4">
<<<<<<< Updated upstream
            {user && isStudent && (
              <Link 
                href="/dashboard/student/profile" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Profile
              </Link>
=======
            {user && (
              <button
                onClick={handleDashboardClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </button>
>>>>>>> Stashed changes
            )}
            <Link 
              href="/employers/register" 
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              For Employers
            </Link>
            {!user ? (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;