'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EmployerRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    industry: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Employer registration:', formData);
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