import { format } from "timeago.js";
import Image from "next/image";
import CopyShareLinkComponent from "@/components/CopyShareLinkComponent";
import GoBack from "@/components/GoBack";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import UpdateArticleStorage from "./UpdateArticleStorage";
import AdComponent from "@/components/AdComponent";

const ArticleContent = ({ data }) => {
  return (
    <div className="flex w-full flex-col justify-start items-start relative p-6 gap-2 border border-gray-200 rounded-t-lg">
      <UpdateArticleStorage data={data} />
      <div className="flex justify-start items-center w-full relative gap-2">
        <GoBack />
        <Image
          src="/assets/greenOnlylogo.svg"
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
        <h1 className="text-lg font-semibold">{data.title}</h1>
      </div>
      <div className="flex justify-between items-center w-full relative">
        <div className="text-black rounded-3xl w-full">
          <pre className="text-sm whitespace-pre-wrap font-poppins">
            <MarkdownRenderer text={data.details} />
          </pre>
        </div>
      </div>
      <hr className="w-full pt-6" />
      <div className="w-full relative">
        <AdComponent adSlot={"1160026352"} />
      </div>
      <div className="font-bold text-2xl">Solution</div>
      <div className="text-black rounded-3xl w-full">
        <pre className="text-sm whitespace-pre-wrap font-poppins">
          <MarkdownRenderer text={data.answer} />
        </pre>
      </div>
      <div className="flex justify-start items-start relative gap-6 pt-4">
        <div className="flex justify-center items-center gap-2 bg-slate-200 rounded-full text-sm px-4 py-2 font-medium cursor-pointer">
          <Image
            src="/assets/comments-icon.png"
            alt="share icon"
            width={20}
            height={20}
          />
          <div>{data.comments}</div>
        </div>
        <CopyShareLinkComponent link={`/article/${data.id}`} />
      </div>
    </div>
  );
};

export default ArticleContent;
