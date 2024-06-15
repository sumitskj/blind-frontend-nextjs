import { format } from "timeago.js";
import Image from "next/image";
import Link from "next/link";
import CopyShareLinkComponent from "@/components/CopyShareLinkComponent";

const FeedPostComponent = ({ data }) => {
  return (
    <Link
      key={data.id}
      href={`/post/${data.id}`}
      className="bg-white hover:shadow-lg border border-gray-200 rounded-lg flex w-full flex-col justify-start items-start relative p-6 gap-2 cursor-pointer"
    >
      <div className="flex justify-start items-center w-full relative gap-2">
        <Image
          src="/assets/GK1200x630.png"
          alt="logo"
          className="rounded-full"
          width={24}
          height={24}
        />
        <div className="text-xs font-semibold">/public</div>
        <div className="font-bold text-gray-600 text-center items-center">
          <span>&#183;</span>
        </div>
        <div className="text-xs text-gray-600">
          {format(new Date(data.createdAt))}
        </div>
      </div>
      <div className="flex justify-between items-center w-full relative">
        <div className="text-lg font-semibold">{data.title}</div>
      </div>
      <div className="flex justify-between items-center w-full relative">
        <div className="post-content-wrapper">
          <div
            className="post-content text-gray-600 text-sm w-full"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      </div>
      <div className="flex justify-start items-start relative gap-6 pt-4">
        <div className="flex justify-center items-center gap-2 bg-slate-200 rounded-full text-sm px-4 py-2 font-medium">
          <Image
            src="/assets/comments-icon.png"
            alt="share icon"
            width={20}
            height={20}
          />
          <div>{data.comments}</div>
        </div>
        <CopyShareLinkComponent link={`/post/${data.id}`} />
      </div>
    </Link>
  );
};

export default FeedPostComponent;
