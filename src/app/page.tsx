'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, Building2, GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import HeroImage from '../Assets/Hero_Image.jpg';
import elon from '../Assets/elon.png'
import eng from '../Assets/eng.png'
import research from '../Assets/research.png'
import design from '../Assets/design.png'
import market from '../Assets/market.png'
import bus from '../Assets/bus.png'

const Home = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const categories = [
    {
      title: 'Technology',
      count: '45 positions',
      image: elon,
      description: 'Explore opportunities in software development, IT, and digital innovation',
      skills: ['Programming', 'Cloud Computing', 'Data Analysis']
    },
    {
      title: 'Engineering',
      count: '32 positions',
      image: eng,
      description: 'Join leading firms in mechanical, electrical, and civil engineering',
      skills: ['CAD', 'Project Management', 'Technical Design']
    },
    {
      title: 'Research',
      count: '28 positions',
      image: research,
      description: 'Contribute to groundbreaking research projects across various fields',
      skills: ['Data Analysis', 'Lab Work', 'Scientific Writing']
    },
    {
      title: 'Design',
      count: '19 positions',
      image: design,
      description: 'Create impactful designs in UI/UX, graphic design, and product design',
      skills: ['Creative Tools', 'User Research', 'Prototyping']
    },
    {
      title: 'Marketing',
      count: '15 positions',
      image: market,
      description: 'Drive growth through digital marketing and brand development',
      skills: ['Social Media', 'Content Creation', 'Analytics']
    },
    {
      title: 'Business',
      count: '23 positions',
      image: bus,
      description: 'Build your career in finance, consulting, and business operations',
      skills: ['Analysis', 'Strategy', 'Communication']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 pt-16 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
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
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src={HeroImage}
                alt="Career Opportunities"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: 'Active Jobs', value: '150+' },
              { icon: Building2, title: 'Partner Companies', value: '50+' },
              { icon: GraduationCap, title: 'Student Placements', value: '200+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform duration-300"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Explore Opportunities
          </h2>
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg border hover:bg-gray-100 z-10"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
              }}
            >
              {categories.map((category, index) => (
                <Link href={`/jobs/${category.title.toLowerCase()}`} key={index} className="flex-none w-[300px]">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] transition-transform duration-300 hover:scale-105">
                    <div className="relative h-40 w-full">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                        <span className="text-blue-600 font-medium">{category.count}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Key Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg border hover:bg-gray-100 z-10"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to better your skills?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Go to these places to learn and earn certifications to impress employers based on your intrests
            </p>
            <div className="space-x-4">
              <Link href="https://www.indeed.com/career-advice/finding-a-job/types-of-certifications-for-jobs" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                  Certifications
                </button>
              </Link>
              <Link href="https://www.coursera.org/courseraplus/?utm_medium=sem&utm_source=bg&utm_campaign=B2C_NAMER__coursera_FTCOF_courseraplus_country-US_BrandExact&campaignid=662918304&adgroupid=1245748005518131&device=c&keyword=coursera&matchtype=e&network=o&devicemodel=&adposition=&creativeid=&assetgroupid={assetgroupid}&targetid=kwd-77859617364943:loc-190&extensionid={extensionid}&hide_mobile_promo&msclkid=6475a04ac5ac12d8de20c726512af8dc&utm_term=coursera&utm_content=Coursera%20Plus%20(Exact)" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                  Courses
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