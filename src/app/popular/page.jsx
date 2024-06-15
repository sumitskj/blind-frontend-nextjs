import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import ScrollingPagination from "@/components/ScrollingPagination";

const getPosts = async (page, limit) => {
  'use server';
  try {
    const res = await fetchBackendApiWrapper(
      `/post/public/popular?limit=${limit}&offset=${page}`,
      {
        method: "GET",
        cache: "no-store",
      },
      null
    );
    if (res && res.ok) {
      const posts = await res.json();
      return posts;
    }
    throw new Error();
  } catch (err) {
    console.error(err);
    return [];
  }
};


const PopularPage = async () => {
  const posts = await getPosts(0, 2);

  return (
    <div className="rounded-lg w-full h-dvh overflow-y-auto">
      <ScrollingPagination initialItems={posts} getData={getPosts} />
    </div>
  );
};

export default PopularPage;
