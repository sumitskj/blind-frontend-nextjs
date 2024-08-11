'use client';
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import ScrollingPagination from "@/components/ScrollingPagination";
import { useEffect, useState } from "react";
import LoadingPageSkeleton from "@/components/LoadingPageSkeleton";

const PopularPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    initPage();
  }, []);

  const getPosts = async (page, limit) => {
    try {
      const res = await fetchBackendApiWrapper(
        `/articles/public/popular?limit=${limit}&offset=${page}&searchQuery=${search}`,
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
    const data = await getPosts(0, 10);
    setPosts(data);
    setLoading(false);
  };

  const handleSearch = () => {
    initPage();
  };

  const handleSearchOnKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="rounded-lg w-full h-[86vh] overflow-y-auto">
      <div className="flex flex-col justify-start items-start w-full h-full">
        <div className="py-2 px-2 w-full flex justify-between items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchOnKeydown}
            placeholder="Search Post..."
            className="w-full bg-white rounded-full border border-slate-200 px-4 py-3 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="p-2 rounded-2xl bg-red-500 text-white"
          >
            Search
          </button>
        </div>
        {!loading && (
          <ScrollingPagination initialItems={posts} getData={getPosts} />
        )}
        {loading && (
          <div className="w-full flex justify-center items-center h-dvh">
            <LoadingPageSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPage;
