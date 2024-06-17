"use client";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useState } from "react";

export const HeaderComponent = () => {
  const pathname = usePathname();

  return (
    <div className="hidden fixed w-full bg-lime-400 shadow-md border-b border-gray-300 z-10 h-20 lg:flex flex-col justify-center items-start">
      <div className="w-full flex justify-between items-center relative bg-lime-400 py-2 px-6">
        <Link href={"/"}>
          <Image
            src="/assets/fulllogo.svg"
            alt="logo"
            width={180}
            height={100}
          />
        </Link>
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
        {/* <div className="flex text-sm justify-start items-center gap-6">
          <Link
            href={"/post/submit"}
            className="bg-white border border-black  rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:bg-slate-100"
          >
            <AddRoundedIcon fontSize="small" className="" />
            PUBLIC POST
          </Link>
          <Link
            href={"/room/submit"}
            className="bg-red-500 hover:bg-red-600 rounded-full px-6 py-2 text-white font-semibold flex justify-center items-center gap-1 border border-black"
          >
            <AddRoundedIcon fontSize="small" className="text-white" />
            PRIVATE DISCUSSION POST
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export const MobileHeaderComponent = () => {
  const pathname = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const router = useRouter();

  const MobileMenuDrawer = ({ openMobileMenu, setOpenMobileMenu }) => {
    return (
      <Drawer
        anchor="right"
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      >
        <div className="mt-16 flex flex-col justify-start items-center relative gap-8 px-1">
          <div className="flex justify-end relative">
            <div onClick={() => setOpenMobileMenu(false)}>
              <CloseIcon />
            </div>
          </div>
          <button
            onClick={() => {
              router.push("/");
              setOpenMobileMenu(false);
            }}
            className={`${
              pathname === "/" ? "underline" : ""
            } px-2 py-2 font-semibold flex justify-end items-center gap-1`}
          >
            <HomeRoundedIcon fontSize="small" />
            HOME
          </button>
          <button
            onClick={() => {
              router.push("/popular");
              setOpenMobileMenu(false);
            }}
            className={`${
              pathname === "/popular" ? "underline" : ""
            } px-2 py-2 font-semibold flex justify-end items-center gap-1`}
          >
            <TrendingUpRoundedIcon fontSize="small" />
            POPULAR
          </button>
          <button
            onClick={() => {
              router.push("/constitution");
              setOpenMobileMenu(false);
            }}
            className={`${
              pathname === "/constitution" ? "underline" : ""
            } px-2 py-2 font-semibold flex justify-end items-center gap-1`}
          >
            <AccountBalanceRoundedIcon fontSize="small" />
            OUR CONSTITUTION
          </button>
          <button
            onClick={() => {
              router.push("/recents");
              setOpenMobileMenu(false);
            }}
            className={`${
              pathname === "/constitution" ? "underline" : ""
            } px-2 py-2 font-semibold flex justify-end items-center gap-1`}
          >
            <ScheduleIcon fontSize="small" />
            Recently Viewed
          </button>
          <button
            onClick={() => {
              router.push("/post/submit");
              setOpenMobileMenu(false);
            }}
            className="bg-white border border-black  rounded-full px-2 py-2 font-semibold flex justify-center items-center gap-1 hover:bg-slate-100"
          >
            <AddRoundedIcon fontSize="small" className="" />
            PUBLIC POST
          </button>
          <button
            onClick={() => {
              router.push("/room/submit");
              setOpenMobileMenu(false);
            }}
            className="bg-red-500 hover:bg-red-600 rounded-full px-2 py-2 text-white font-semibold flex justify-center items-center gap-1 border border-black"
          >
            <AddRoundedIcon fontSize="small" className="text-white" />
            PRIVATE DISCUSSION POST
          </button>
        </div>
      </Drawer>
    );
  };

  return (
    <div className="fixed flex flex-col justify-center items-start lg:hidden w-full shadow-md border-b border-gray-300 z-10">
      <div className="w-full flex justify-between items-center relative bg-lime-500 py-2 px-6 h-20">
        <Image src="/assets/fulllogo.svg" alt="logo" width={180}
            height={100} />
        <div
          onClick={() => setOpenMobileMenu(true)}
          className="lg:hidden cursor-pointer text-white"
        >
          <MenuIcon color="inherit" />
        </div>
        <MobileMenuDrawer
          openMobileMenu={openMobileMenu}
          setOpenMobileMenu={setOpenMobileMenu}
        />
      </div>
    </div>
  );
};

export const MobileBottomNavbar = () => {
  const pathname = usePathname();
  return (
    <div
      className={`flex lg:hidden bottom-0 justify-between items-center w-full px-6 py-2 bg-lime-500 z-10`}
    >
      <Link
        href={"/"}
        className={`${
          pathname === "/" ? "bg-black text-white" : "bg-white text-black"
        } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:shadow-[-1px_1px_1px_0px_black] shadow-[-1px_2px_3px_0px_black]`}
      >
        <HomeRoundedIcon fontSize="small" />
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
      </Link>
      <Link
        href={"/recents"}
        className={`${
          pathname === "/constitution"
            ? "bg-black text-white"
            : "bg-white text-black"
        } rounded-full px-6 py-2 font-semibold flex justify-center items-center gap-1 hover:shadow-[-1px_1px_1px_0px_black] shadow-[-1px_2px_3px_0px_black]`}
      >
        <ScheduleIcon fontSize="small" />
      </Link>
    </div>
  );
};