"use client";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const HeaderComponent = () => {
  const pathname = usePathname();

  return (
    <div className="fixed w-full bg-lime-500 shadow-md border-b border-gray-300 z-10">
      <div className="w-full flex justify-between items-center relative bg-lime-500 py-2 px-6">
        <Image src="/assets/GK1200x630.png" alt="logo" width={112} height={1} />
        <div className="font-rubikMono flex justify-start items-center gap-6">
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "bg-black text-white" : "bg-white text-black"
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:shadow-[-1px_1px_1px_0px_black] shadow-[-1px_2px_3px_0px_black]`}
          >
            <HomeRoundedIcon fontSize="small" />
            HOME
          </Link>
          <Link
            href={"/popular"}
            className={`${
              pathname.includes("/popular")
                ? "bg-black text-white"
                : "bg-white text-black"
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:shadow-[-1px_1px_1px_0px_black] shadow-[-1px_2px_3px_0px_black]`}
          >
            <TrendingUpRoundedIcon fontSize="small" />
            POPULAR
          </Link>
          <Link
            href={"/constitution"}
            className={`${
              pathname === "/constitution"
                ? "bg-black text-white"
                : "bg-white text-black"
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:shadow-[-1px_1px_1px_0px_black] shadow-[-1px_2px_3px_0px_black]`}
          >
            <AccountBalanceRoundedIcon fontSize="small" />
            OUR CONSTITUTION
          </Link>
        </div>
        <div className="flex text-sm justify-start items-center gap-6">
          <Link
            href={"/post/submit"}
            className="bg-white border border-black  rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:bg-slate-100"
          >
            <AddRoundedIcon fontSize="small" className="" />
            PUBLIC POST
          </Link>
          <Link
            href={"/room/submit"}
            className="bg-indigo-500 hover:bg-blue-700 rounded-full px-6 py-2 text-white font-semibold flex justify-center items-center gap-1 border border-black"
          >
            <AddRoundedIcon fontSize="small" className="text-white" />
            PRIVATE DISCUSSION POST
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
