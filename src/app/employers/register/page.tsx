'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase/firebaseConfig';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

const EmployerRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    industry: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    try {
      const userCredential = await createUserWithEmailAndPassword(formData.email, formData.password);
      const user = userCredential.user;

      // Store user type in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        role: 'employer',
        companyName: formData.companyName,
        email: formData.email,
        industry: formData.industry,
      });

      console.log('Employer registered:', user);
      // Redirect to employer dashboard
      router.push('/dashboard/employer');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Employer Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            />
            <input
              type="email"
              placeholder="Business Email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <select
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="engineering">Engineering</option>
              <option value="research">Research</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="business">Business</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerRegister; 