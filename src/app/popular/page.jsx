'use client';
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import ScrollingPagination from "@/components/ScrollingPagination";
import { useEffect, useState } from "react";
import LoadingPageSkeleton from "@/components/LoadingPageSkeleton";

const PopularPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initPage();
  }, []);

  const getPosts = async (page, limit) => {
    try {
      const res = await fetchBackendApiWrapper(
        `/post/public/popular?limit=${limit}&offset=${page}`,
        {
          method: "GET",
          cache: "no-store",
        },
        null
      );
      if (res && res.ok) {
        const posts = await res.json();
        return posts;
      }
      throw new Error();
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const initPage = async () => {
    setLoading(true);
    const data = await getPosts(0, 4);
    setPosts(data);
    setLoading(false);
  };

  return (
    <div className="rounded-lg w-full h-[86vh] overflow-y-auto">
      {!loading && (
        <ScrollingPagination initialItems={posts} getData={getPosts} />
      )}
      {loading && (
        <div className="w-full flex justify-center items-center bg-white h-dvh">
          <LoadingPageSkeleton />
        </div>
      )}
    </div>
  );
};

export default PopularPage;
