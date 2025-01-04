'use client';

import axios from 'axios';
import { Briefcase, Building, ChevronDown, PlusCircle, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'; 
import { useState } from 'react';

export const SubmitForm = () => {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('fresher');
  const [company, setCompany] = useState('top');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!session?.user?.id) {
      console.error('User is not authenticated.');
      return;
    }
  
    const id = session.user.id;
    const review = "Good";
  
    try {
      const response = await axios.post('http://localhost:4000/book-interview', {
        role,
        company,
        experience,
        id,
        review,
      });

      const interviewId = response.data.interviewId;

      localStorage.setItem('interviewId', interviewId);
  
      const big_string = response.data.questions;
      if (typeof big_string === 'string') {
        const small_strings: string[] = big_string.split('\n');
        const evenIndexStrings = small_strings.filter((_, index) => index % 2 === 0);
  
        localStorage.setItem('questionsData', JSON.stringify(evenIndexStrings));
      }
  
      setTimeout(() => {
        redirect('/dashboard/interview');
      }, 1000); 
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <PlusCircle className="mr-2 text-gray-600" />
        Start New Interview
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Input */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition"
              placeholder="e.g. Frontend Developer"
            />
          </div>
        </div>

        {/* Experience Select */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition appearance-none"
            >
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Company Input */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition"
              placeholder="e.g. TechCorp"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
        >
          Start Interview
        </button>
      </form>
    </section>
  );
};

export default SubmitForm;
