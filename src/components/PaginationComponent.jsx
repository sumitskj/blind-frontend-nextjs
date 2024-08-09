"use client";

import { Pagination, PaginationItem } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useRouter } from "next/navigation";

const PaginationComponent = ({ totalPages, page = 1 }) => {
  const router = useRouter();
  return (
    <div>
      {totalPages >= page && (
        <div className="flex justify-center bg-white items-center relative gap-3 mt-2 p-2 w-full">
          <Pagination
            count={totalPages}
            boundaryCount={2}
            page={page}
            shape="rounded"
            color="primary"
            renderItem={(item) => {
              if (item.type === "previous") {
                return (
                  <button
                    {...item}
                    className={`flex justify-start items-center gap-1 pr-2 ${
                      page === 1 ? "text-gray-400" : "text-blue-600"
                    } text-xs`}
                  >
                    <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                    {"Previous"}
                  </button>
                );
              }
              if (item.type === "next") {
                return (
                  <button
                    {...item}
                    className={`flex justify-start items-center gap-1 pl-2 ${
                      page === totalPages
                        ? "text-gray-400"
                        : "text-blue-600"
                    } text-xs`}
                  >
                    {"Next"}
                    <ArrowForwardIosRoundedIcon fontSize="inherit" />
                  </button>
                );
              }
              return (
                <PaginationItem
                  {...item}
                  sx={{
                    ...(item.type === "page" && {
                      fontSize: "0.8rem",
                    }),
                  }}
                />
              );
            }}
            onChange={(e, v) => {
              router.push(`/articles?page=${v}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PaginationComponent;
