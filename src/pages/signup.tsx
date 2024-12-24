'use client';
import { useState } from "react";
import '../app/globals.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseConfig';
import Link from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res);
      setEmail('');
      setPassword('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
