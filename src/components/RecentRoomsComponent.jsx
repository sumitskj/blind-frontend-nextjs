"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const RecentRoomsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    setRooms(JSON.parse(window.localStorage.getItem("recentRooms"))?.slice(0, 10));
    setPosts(JSON.parse(window.localStorage.getItem("recentPosts"))?.slice(0, 10));
    setArticles(JSON.parse(window.localStorage.getItem("recentArticles"))?.slice(0, 10));
  }, []);

  return (
      <div className="flex flex-col border border-gray-200 justify-start items-start w-full overflow-y-auto relative px-6 py-4 bg-gradient-to-b from-white to-white rounded-lg gap-8">
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
        <div className="w-full">
          {rooms && rooms.length > 0 && (
            <div className="font-medium">Recently Viewed Private Posts</div>
          )}
          <div className="flex flex-col justify-start items-start w-full relative gap-1">
            {rooms &&
              rooms?.map((r, ind) => {
                return (
                  <Link
                    href={`/room/${r.id}/${r.password}`}
                    key={ind}
                    className="truncate w-full text-blue-600 font-medium text-sm hover:underline cursor-pointer"
                  >
                    {r.title}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="w-full">
          {posts && posts.length > 0 && (
            <div className="font-medium">Recently Viewed Posts</div>
          )}
          <div className="flex flex-col justify-start items-start w-full relative gap-1">
            {posts &&
              posts
                .filter((r) => r !== null)
                .map((r, ind) => {
                  return (
                    <Link
                      href={`/post/${r.id}`}
                      key={ind}
                      className="truncate w-full text-blue-600 font-medium text-sm hover:underline cursor-pointer"
                    >
                      {r.title}
                    </Link>
                  );
                })}
          </div>
        </div>
        <div className="w-full">
          {articles && articles.length > 0 && (
            <div className="font-medium">Recently Viewed Articles</div>
          )}
          <div className="flex flex-col justify-start items-start w-full relative gap-1">
            {articles &&
              articles?.map((r, ind) => {
                return (
                  <Link
                    href={`/article/${r.id}/${r.title
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    key={ind}
                    className="truncate w-full text-blue-600 font-medium text-sm hover:underline cursor-pointer"
                  >
                    {r.title}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
  );
};

export default RecentRoomsComponent;
