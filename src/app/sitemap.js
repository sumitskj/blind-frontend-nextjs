import { fetchBackendApiWrapper } from "@/utils/apiWrapper";

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITE_URL;

const getTotalSitemapLinksCount = async () => {
  try {
    const res = await fetchBackendApiWrapper(
      `/totalSitemapLinks`,
      {
        method: "GET",
      },
      null
    );
    if (res && res.ok) {
      const data = await res.json();
      return data.totalCount;
    }
    throw new Error();
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getLinksForSitemap = async (id) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/sitemap?page=${id}`,
      {
        method: "GET",
      },
      null
    );
    if (res && res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error();
  } catch (err) {
    console.error(err);
    return [];
  }
};
export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  const totalSize = await getTotalSitemapLinksCount();
  console.log("totalSize ", Math.ceil(totalSize / 500));
  const data = Array(Math.ceil(totalSize / 500))
    .fill()
    .map((x, i) => {
      return { id: i + 1 };
    });
  return data;
}

export default async function sitemap({ id }) {
  // Google's limit is 50,000 URLs per sitemap
  const links = await getLinksForSitemap(id);
  return links.map((l) => ({
    url: `${EXTERNAL_DATA_URL}${l.url}`,
    lastModified: l.lastModified,
  }));
}
