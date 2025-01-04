'use client';

import { useUserDetail } from '@/hooks/hooks';
import { User } from 'lucide-react';
import Link from 'next/link';

export const PreviousInterviews = () => {
  const {isLoading, data} = useUserDetail()
  if (isLoading) {
    return <h2>Loading...</h2>;
  }



  return (
    <section className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <User className="mr-2 text-gray-600" />
        Previous Interviews
      </h2>
      {!data?.data && <h2>No Interviews Found Yet!</h2>}
        {data?.data && data.data.length > 0 ? (
          <ul className="space-y-4">
            {data.data.map((interview) => (
              
            <Link onClick={()=>{
            }} key={interview.id} href={`/dashboard/interview/${interview.id}`}>
              <li className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{interview.role}</h3>
                  <span className="text-sm text-gray-500">{interview.company}</span>
                </div>
                <div className="text-sm text-gray-600 flex justify-between">
                  <p>Experience: {interview.experience}</p>
                </div>
              </li>  
            </Link>
            ))}
          </ul>
        ) : (
          <h2>No interviews found.</h2>
        )}
    </section>
  );
};
