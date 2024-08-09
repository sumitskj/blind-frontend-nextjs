import PaginationComponent from "@/components/PaginationComponent";
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import Link from "next/link";

const getAllArticlesData = async (page) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/allArticles?page=${page}`,
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

export async function generateMetadata({ params, searchParams }) {
  // Fetch post data
  const articleData = await getAllArticlesData(searchParams.page);
  let description =
    "List of all Articles from Boldena. Boldena has articles from tech articles to random general questions.";

  const metadata = {
    title: `All Articles | BolDena`,
    description: description,
    openGraph: {
      title: articleData.title,
      description: description,
      type: "article",
      url: `https://boldena.com/articles`,
      images: ["/opengraph-image.png"],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "All Articles | BolDena",
    datePublished: new Date(),
    dateModified: new Date(),
    description: description,
    author: {
      "@type": "Person",
      name: "Anon",
    },
  };

  metadata.structuredData = structuredData;
  return metadata;
}

const AllArticlesPage = async ({ params, searchParams }) => {
  const articleData = await getAllArticlesData(searchParams.page);

  return (
    <>
      <div
        className="no-scroll w-full px-2 pb-10 overflow-y-auto"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="w-full bg-white flex flex-col justify-start items-center gap-2 px-4">
          <div className="py-4 text-lg font-semibold">All Articles</div>
          <ol className="list-disc">
            {articleData &&
              articleData.links.map((a, ind) => {
                return (
                  <li className="hover:text-blue-500 py-1" key={ind}>
                    <Link href={a.url}>{a.title}</Link>
                  </li>
                );
              })}
          </ol>
          <div className="w-full py-2">
            <PaginationComponent
              totalPages={articleData.totalPages}
              page={Number(searchParams.page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllArticlesPage;
