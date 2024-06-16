import { Box, Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="w-full text-center bg-white h-screen flex justify-center items-center">
      <Box
        sx={{ width: "350px", margin: "2rem", my: 5, display: "inline-block" }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={250}
          sx={{ borderRadius: "1rem" }}
        />
        <Box sx={{ pt: 1 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
    </div>
  );
}
