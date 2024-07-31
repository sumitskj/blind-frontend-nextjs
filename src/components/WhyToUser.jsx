import Image from "next/image";

const WhyToUse = () => {
    return (
      <div className="relative bg-gradient-to-b from-white to-lime-100 w-full h-full rounded-lg shadow-lg p-4 flex flex-col justify-start items-center">
        <div className="relative font-poppins font-extrabold text-center w-full text-2xl py-10 z-20">
          WHY USE BOLDENA?
        </div>
        <div className="absolute inset-0 top-20 left-10 opacity-30 z-10">
          <Image
            src="/assets/speaker.svg"
            alt="logo"
            width={180}
            height={100}
          />
        </div>
        <div className="font-acme w-full text-xl font-bold text-center text-blue-800 z-20">
          <ul className="list-inside list-disc">
            <li className="py-6">NO LOGINS EVER</li>
            <li className="py-6">
              BE ANONYMOUS ALWAYS AND SHARE YOUR THOUGHTS
            </li>
            <li className="py-6">
              CREATE PRIVATE SHAREABLE DISCUSSION POSTS TO GET HONEST FEEDBACKS
              FROM YOUR COLLEAGUES
            </li>
            <li>
              EXPRESS YOURSELF OR ASK ANY QUESTION WITHOUT THINKING OF HOW
              PEOPLE WILL JUDGE YOU.
            </li>
          </ul>
        </div>
      </div>
    );
}

export default WhyToUse;