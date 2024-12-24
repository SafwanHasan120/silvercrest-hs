'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Building2, GraduationCap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 300; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 300; // Adjust the scroll amount as needed
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 pt-16 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Left side - Text content */}
            <div className="md:w-1/2 text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Silvercrest High School
                <span className="block text-2xl md:text-3xl mt-2 font-normal">Career Opportunities</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Connect with leading employers and discover opportunities that match your skills and interests
              </p>
              <div className="space-x-4">
                <Link href="/signup">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="/career-illustration.svg"
                alt="Career Opportunities"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: "Active Jobs", value: "150+" },
              { icon: Building2, title: "Partner Companies", value: "50+" },
              { icon: GraduationCap, title: "Student Placements", value: "200+" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Manual Scroll with Arrows */}
      <section className="bg-gray-50 py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Explore Opportunities
          </h2>
          <div className="flex items-center">
            <button 
              onClick={scrollLeft} 
              className="relative left 50 z-10 bg-white hover:bg-gray-100 p-4 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
              aria-label="Scroll left"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar px-12"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {[
                { title: "Technology", count: "45 positions", color: "bg-purple-100" },
                { title: "Engineering", count: "32 positions", color: "bg-blue-100" },
                { title: "Research", count: "28 positions", color: "bg-green-100" },
                { title: "Design", count: "19 positions", color: "bg-yellow-100" },
                { title: "Marketing", count: "15 positions", color: "bg-pink-100" },
                { title: "Business", count: "23 positions", color: "bg-orange-100" }
              ].map((category, index) => (
                <Link 
                  href={`/jobs/${category.title.toLowerCase()}`} 
                  key={index}
                  className="flex-none w-[300px]"
                >
                  <div className={`${category.color} p-6 rounded-xl hover:shadow-md transition-shadow duration-300 cursor-pointer h-full`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600">{category.count}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button 
              onClick={scrollRight} 
              className="relative right50 z-10 bg-white hover:bg-gray-100 p-4 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
              aria-label="Scroll right"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Career Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Create your profile today and get personalized job recommendations based on your interests and skills.
            </p>
            <div className="space-x-4">
              <Link href="/signup">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                  Register Now
                </button>
              </Link>
              <Link href="/employers/register">
                <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                  Post a Job
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Home;