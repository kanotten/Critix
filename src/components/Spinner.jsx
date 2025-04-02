import React from "react";

const Spinner = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-gray-100"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"
        aria-hidden="true"
      ></div>
      <p className="mt-4 text-gray-700 text-sm">Loading content..</p>
    </div>
  );
};

export default Spinner;
