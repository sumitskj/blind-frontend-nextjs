"use client";

import Image from "next/image";
import { sendSucessNotification } from "./NotificationComponent";

const CopyShareLinkComponent = ({link}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        const t = `${window.location.origin}${link}`;
        navigator.clipboard.writeText(t);
        sendSucessNotification({ message: `Link Copied : ${t}` });
      }}
      className="flex justify-center items-center gap-2 bg-slate-200 rounded-full text-sm px-4 py-2 font-medium cursor-pointer"
    >
      <Image
        src="/assets/share-icon.png"
        alt="share icon"
        width={20}
        height={20}
      />
      <div>Share</div>
    </div>
  );
};

export default CopyShareLinkComponent;
