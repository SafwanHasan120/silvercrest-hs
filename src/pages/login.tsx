'use client';
import { useState } from "react";
import '../app/globals.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseConfig';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Sign In</h2>
        <form onSubmit={handleSignIn}>
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
            Sign In
          </button>
        </form>
        {loading && <p className="text-gray-600 text-center mt-4">Signing in...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}
        {user && <p className="text-green-500 text-center mt-4">Signed in successfully!</p>}
        <button
          onClick={() => router.push('/')}
          className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Back to Home
        </button>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
