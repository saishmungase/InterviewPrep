'use client';

import { BookOpen } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-gray-800" aria-hidden="true" />
          <h1 className="font-bold text-lg text-gray-900">InterviewPrep</h1>
        </div>

        {/* Auth Buttons */}
        <div>
          {session?.user ? (
            <button
              className="bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => signOut()}
              aria-label="Log out"
            >
              LogOut
            </button>
          ) : (
            <button
              className="bg-black text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
              onClick={() => signIn()}
              aria-label="Sign in"
            >
              SignIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
