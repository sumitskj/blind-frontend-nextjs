import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import CommentSection from "@/components/CommentSection";
import RoomContent from "./RoomContent";

const getRoomData = async (roomId, roomPass) => {
  try {
    const res = await fetchBackendApiWrapper(
      `/room/${roomId}/${roomPass}`,
      {
        method: "GET",
        cache: "no-store",
      },
      null
    );
    if (res && res.ok) {
      const roomData = await res.json();
      return roomData;
    }
    throw new Error();
  } catch (err) {
    throw err;
  }
};

export async function generateMetadata({ params }) {
  // Fetch room data
  const roomData = await getRoomData(params.room[0], params.room[1]);
  let description = roomData.content ? roomData.content : roomData.title;
  description = description.replace(/<[^>]*>?/gm, "").substring(0, 75);

  const metadata = {
    title: `${roomData.title} | BolDena`,
    description: description,
    openGraph: {
      title: roomData.title,
      description: description,
      type: "article",
      url: `https://boldena.com/room/${roomData.id}/${roomData.password}`,
      images: ["/opengraph-image.png"],
    },
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: roomData.title,
    datePublished: roomData.updatedAt,
    dateModified: roomData.createdAt,
    description: description,
    author: {
      "@type": "Person",
      name: "Anon",
    },
  };

  metadata.structuredData = structuredData;
  return metadata;
}

const RoomPage = async ({ params }) => {
  const roomData = await getRoomData(params.room[0], params.room[1]);

  return (
    <div className="no-scroll w-full px-2 pb-10 h-dvh overflow-y-auto">
      <div className="w-full bg-white  flex flex-col justify-start items-center gap-1">
        <RoomContent data={roomData} />
        <CommentSection entityId={params.room[0]} />
      </div>
    </div>
  );
};

export default RoomPage;
