import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import Link from "next/link";

const getArticles = async () => {
    try {
      const res = await fetchBackendApiWrapper(
        `/relatedArticles`,
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

const Footer = async () => {
    const articles = await getArticles();

    return (
      <div className="flex flex-col justify-start items-start w-full relative px-10 py-4 gap-6 bg-gray-50">
        <div className="font-semibold text-lg">More Related Articles</div>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-start gap-2 w-full relative">
          {articles &&
            articles.slice(0, 20).map((a, ind) => {
              return (
                <div
                  key={ind}
                  className="grid-cols-1 w-full px-2 truncate text-blue-500 text-xs underline"
                >
                  <Link
                    href={`/article/${a.id}/${a.title
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                  >
                    {a.title}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
}

export default Footer;