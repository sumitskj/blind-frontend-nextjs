"use client";

import FeedPostComponent from "@/components/FeedPostComponent";
import { CircularProgress } from "@mui/material";
import { useState, useEffect, useCallback, useRef } from "react";

const ScrollingPagination = ({ initialItems, getData }) => {
  const [items, setItems] = useState(initialItems);
  const [currentPage, setCurrentPage] = useState(1); // Start from the second page as first is already fetched
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;
  const observer = useRef(null);
  const lastItemRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const newData = await getData(currentPage, limit);
        setHasMore(newData.length > 0);
        setItems((prevData) => [...prevData, ...newData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    if(hasMore && !loading){
      fetchData();
    }
  }, [currentPage]);

  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-3 no-scroll px-2 pb-10">
      {items &&
        items.map((p, index) => {
          if (items.length === index + 1) {
            return (
              <div key={p.id} className="w-full" ref={lastItemRef}>
                <FeedPostComponent data={p} />
              </div>
            );
          } else {
            return (
              <div key={p.id} className="w-full">
                <FeedPostComponent data={p} />
              </div>
            );
          }
        })}
      {loading && (
        <div className="text-gray-700">
          <CircularProgress color="inherit" size={"1.4rem"} />
        </div>
      )}
      {!loading && !hasMore && (
        <div className="text-gray-700 bg-white p-2 w-full text-center shadow-lg rounded-lg">You have reached the End</div>
      )}
    </div>
  );
};

export default ScrollingPagination;