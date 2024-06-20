import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import CommentSection from "@/components/CommentSection";
import PostContent from "./PostContent";

const getPostData = async (postId) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/post/${postId}`,
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

export async function generateMetadata({ params }) {
  // Fetch post data
  const postData = await getPostData(params.postId);
  let description = postData.content ? postData.content : postData.title;
  description = description.replace(/<[^>]*>?/gm, "").substring(0, 75);

  const metadata = {
    title: `${postData.title} | BolDena`,
    description: description,
    openGraph: {
      title: postData.title,
      description: description,
      type: "article",
      url: `https://boldena.com/post/${postData.id}`,
      images: ["/opengraph-image.png"],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postData.title,
    datePublished: postData.updatedAt,
    dateModified: postData.createdAt,
    description: description,
    author: {
      "@type": "Person",
      name: "Anon",
    },
  };

  metadata.structuredData = structuredData;
  return metadata;
}

const PostPage = async ({ params }) => {
  const postData = await getPostData(params.postId);

  return (
    <>
      <div className="no-scroll w-full px-2 pb-10 h-dvh overflow-y-auto">
        <div className="w-full bg-white  flex flex-col justify-start items-center gap-1">
          <PostContent data={postData} />
          <CommentSection entityId={params.postId} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
