import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import CommentSection from "@/components/CommentSection";
import AdComponent from "@/components/AdComponent";
import ArticleContent from "./[...articleName]/ArticleContent";

const getArticleData = async (articleId) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/article/${articleId}`,
      {
        method: "GET",
        cache: "no-store",
      },
      null
    );
    if (res && res.ok) {
      const articleData = await res.json();
      return articleData;
    } else {
      throw new Error();
    }
  } catch (err) {
    throw err;
  }
};

export async function generateMetadata({ params }) {
  // Fetch post data
  const articleData = await getArticleData(params.articleId);
  let description = articleData.details
    ? articleData.details
    : articleData.title;
  description = description.replace(/<[^>]*>?/gm, "").substring(0, 75);

  const metadata = {
    title: `${articleData.title} | BolDena`,
    description: description,
    openGraph: {
      title: articleData.title,
      description: description,
      type: "article",
      url: `https://boldena.com/article/${articleData.id}`,
      images: ["/opengraph-image.png"],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleData.title,
    datePublished: articleData.updatedAt,
    dateModified: articleData.createdAt,
    description: description,
    author: {
      "@type": "Person",
      name: "Anon",
    },
  };

  metadata.structuredData = structuredData;
  return metadata;
}

const ArticlePage = async ({ params }) => {
  const articleData = await getArticleData(params.articleId);

  return (
    <>
      <div
        className="no-scroll w-full px-2 pb-10 overflow-y-auto"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="w-full bg-white  flex flex-col justify-start items-center gap-1">
          <ArticleContent data={articleData} />
          <AdComponent adSlot={"1361468220"} />
          <CommentSection entityId={params.articleId} />
          <AdComponent adSlot={"6268984431"} />
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
