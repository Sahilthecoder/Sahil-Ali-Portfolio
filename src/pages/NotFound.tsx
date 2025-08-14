import React from "react";
import { Home, Search } from "lucide-react";
import { Link } from "react-router-dom"; // or next/link if Next.js

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 text-center px-6">
      {/* Big Error Number */}
      <h1 className="text-8xl font-extrabold text-neutral-800 dark:text-neutral-200 tracking-tight">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
        Oops! Page Not Found
      </h2>

      {/* Message */}
      <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.  
        Let’s get you back on track.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          <Home size={18} /> Back to Home
        </Link>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
        >
          <Search size={18} /> View Projects
        </Link>
      </div>

      {/* Decorative */}
      <div className="mt-10 w-24 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent rounded-full" />
    </div>
  );
};

export default NotFoundPage;
