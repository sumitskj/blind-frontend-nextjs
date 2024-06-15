'use client';

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBack = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.replace('/')}
      className="bg-gray-100 rounded-full p-2 text-gray-400 hover:bg-gray-200 cursor-pointer"
    >
      <ArrowBackIcon fontSize="small" />
    </div>
  );
};

export default GoBack;
