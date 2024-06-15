"use client";

import FeedPostComponent from "@/components/FeedPostComponent";
import { CircularProgress } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

const ScrollingPagination = ({ initialItems, getData }) => {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1); // Start from the second page as first is already fetched
  const [loading, setLoading] = useState(false);
  const limit = 2;

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const newItems = await getData(page, limit);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    };

    loadItems();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);


  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-3 no-scroll px-2 pb-10">
      {items && items.map((p) => (
        <div key={p.id} className="w-full">
          <FeedPostComponent data={p} />
          <hr className="w-full text-gray-600" />
        </div>
      ))}
      {loading && <div className="text-gray-700"><CircularProgress color="inherit" size={"1.4rem"} /></div>}
    </div>
  );
};

export default ScrollingPagination;
