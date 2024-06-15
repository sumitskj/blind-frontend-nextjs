import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import CommentSection from "@/components/CommentSection";
import PostContent from "./PostContent";

const PostPage = async ({ params }) => {
  const getPostData = async () => {
    try {
      const res = await fetchBackendApiWrapper(
        `/post/${params.postId}`,
        {
          method: "GET",
          cache: "no-store",
        },
        null
      );
      if (res && res.ok) {
        const postData = await res.json();
        return postData;
      } else {
        throw new Error();
      }
    } catch (err) {
      throw err;
    }
  };

  const postData = await getPostData();

  return (
    <div className="no-scroll w-full px-2 pb-10 h-dvh overflow-y-auto">
      <div className="w-full bg-white  flex flex-col justify-start items-center gap-1">
        <PostContent data={postData} />
        <CommentSection entityId={params.postId} />
      </div>
    </div>
  );
};

export default PostPage;
