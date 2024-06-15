"use client";

import { sendSucessNotification } from "@/components/NotificationComponent";
import Image from "next/image";

const CopyRoomLink = ({ link }) => {
  const copyShareUrl = () => {
    let t = `${window.location.origin}${link}`;
    navigator.clipboard.writeText(t);
    sendSucessNotification({ message: `Link Copied : ${t}` });
  };

  return (
    <div
      onClick={copyShareUrl}
      className="flex justify-center items-center gap-2 bg-green-400 rounded-full text-sm px-4 py-2 font-medium cursor-pointer"
    >
      <Image
        src="/assets/share-icon.png"
        alt="share icon"
        width={20}
        height={20}
      />
      <div>Share with others</div>
    </div>
  );
};

export default CopyRoomLink;
