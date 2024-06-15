"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-24 gap-6">
      <div className="text-center w-full text-xl font-medium">
        {`Oops! 404 Page not found`}
      </div>
      <Link
        href={"/"}
        className="px-4 py-2 bg-blue-500 font-semibold rounded-md text-white"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
