"use client";

import Link from "next/link";

const ErrorPage = ({error, reset}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center pt-24 gap-6">
      <div className="text-center w-full text-xl font-medium">
        {`Oops! Something went wrong ${JSON.stringify(error)}`}
      </div>
      <Link
        href={"/"}
        className="px-4 py-2 bg-blue-500 font-semibold rounded-md text-white"
      >
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
