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
    <div className="fixed w-full bg-white shadow-md border-b border-gray-300 z-10">
      <div className="w-full flex justify-between items-center relative bg-white py-2 px-6">
        <Image src="/assets/GK1200x630.png" alt="logo" width={112} height={1} />
        <div className="font-rubikMono flex justify-start items-center gap-6">
          <Link
            href={"/"}
            className={`${
              pathname === "/" ? "bg-black text-white" : "bg-white text-black"
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1`}
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
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1`}
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
            } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1`}
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
            CREATE POST
          </Link>
          <Link
            href={"/room/submit"}
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 text-white font-semibold flex justify-center items-center gap-1"
          >
            <AddRoundedIcon fontSize="small" className="text-white" />
            CREATE ROOM
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
