"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const RecentRoomsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setRooms(JSON.parse(window.localStorage.getItem("recentRooms")).slice(0, 10));
    setPosts(JSON.parse(window.localStorage.getItem("recentPosts")).slice(0, 10));
  }, []);

  return (
    <div className="px-2 w-full">
      <div className="flex flex-col border border-gray-200 justify-start items-start w-full relative px-6 py-4 h-screen overflow-hidden bg-white rounded-lg gap-8">
        <div>
          {rooms && rooms.length > 0 && (
            <div className="font-medium">Recently Viewed Rooms</div>
          )}
          <div className="flex flex-col justify-start items-start w-full relative gap-1 overflow-y-auto">
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
        <div>
          {posts && posts.length > 0 && (
            <div className="font-medium">Recently Viewed Posts</div>
          )}
          <div className="flex flex-col justify-start items-start w-full relative gap-1 overflow-y-auto">
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
      </div>
    </div>
  );
};

export default RecentRoomsComponent;
