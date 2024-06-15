import FeedPostComponent from "@/components/FeedPostComponent";
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";

const Home = async () => {
  const getPosts = async () => {
    try {
      const res = await fetchBackendApiWrapper(
        "/post/public",
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

  const posts = await getPosts();

  return (
    <div className="rounded-lg w-full flex flex-col justify-start items-center relative gap-3 no-scroll px-2 pb-10 h-dvh overflow-y-auto">
      {posts &&
        posts.map((p) => (
          <div key={p.id} className="w-full">
            <FeedPostComponent data={p} />
            <hr className="w-full text-gray-600" />
          </div>
        ))}
    </div>
  );
};

export default Home;
