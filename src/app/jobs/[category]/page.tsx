'use client';
import * as React from 'react';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
}

const dummyJobs: Record<string, JobListing[]> = {
  technology: [
    {
      id: "tech1",
      title: "Junior Web Developer Intern",
      company: "TechCorp Solutions",
      location: "Remote",
      type: "Internship",
      description: "Looking for a passionate student interested in learning web development with React and Node.js."
    },
    {
      id: "tech2",
      title: "IT Support Assistant",
      company: "Digital Systems Inc",
      location: "Hybrid",
      type: "Part-time",
      description: "Help desk and technical support role perfect for students studying IT or Computer Science."
    }
  ],
  engineering: [
    {
      id: "eng1",
      title: "Engineering Assistant",
      company: "BuildRight Engineering",
      location: "On-site",
      type: "Summer Internship",
      description: "Assist in CAD design and basic structural analysis. Perfect for future engineers."
    },
    {
      id: "eng2",
      title: "Robotics Club Mentor",
      company: "Innovation Labs",
      location: "On-site",
      type: "Part-time",
      description: "Guide younger students in robotics projects and competitions."
    }
  ],
  research: [
    {
      id: "res1",
      title: "Research Assistant",
      company: "BioTech Research",
      location: "Laboratory",
      type: "Summer Program",
      description: "Assist in conducting basic research and data collection in our state-of-the-art lab."
    },
    {
      id: "res2",
      title: "Data Analysis Intern",
      company: "Research Institute",
      location: "Hybrid",
      type: "Part-time",
      description: "Help analyze research data and prepare reports. Excel skills required."
    }
  ],
  design: [
    {
      id: "des1",
      title: "Graphic Design Intern",
      company: "Creative Studios",
      location: "Remote",
      type: "Internship",
      description: "Create social media graphics and basic marketing materials."
    },
    {
      id: "des2",
      title: "UI/UX Design Assistant",
      company: "Digital Agency",
      location: "Hybrid",
      type: "Part-time",
      description: "Help design user interfaces for web and mobile applications."
    }
  ],
  marketing: [
    {
      id: "mkt1",
      title: "Social Media Assistant",
      company: "Brand Builders",
      location: "Remote",
      type: "Part-time",
      description: "Help manage social media accounts and create engaging content."
    },
    {
      id: "mkt2",
      title: "Marketing Intern",
      company: "Growth Marketing Inc",
      location: "Hybrid",
      type: "Summer Internship",
      description: "Learn digital marketing strategies and help implement campaigns."
    }
  ],
  business: [
    {
      id: "bus1",
      title: "Business Development Intern",
      company: "Enterprise Solutions",
      location: "On-site",
      type: "Internship",
      description: "Learn about sales and business development in a fast-paced environment."
    },
    {
      id: "bus2",
      title: "Administrative Assistant",
      company: "Corporate Services",
      location: "On-site",
      type: "Part-time",
      description: "Gain experience in office administration and business operations."
    }
  ]
};

const JobCategory = ({ params }: { params: Promise<{ category: string }> }) => {
    const unwrappedParams = React.use(params);
    const { category } = unwrappedParams;
    const jobs = dummyJobs[category] || [];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {category} Opportunities
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-blue-600 mb-2">{job.company}</p>
                <div className="flex gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {job.location}
                  </span>
                  <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply
                </button>
                <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategory; 