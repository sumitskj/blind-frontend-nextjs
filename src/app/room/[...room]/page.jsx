import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import CommentSection from "@/components/CommentSection";
import RoomContent from "./RoomContent";

const RoomPage = async ({ params }) => {
  const getRoomData = async () => {
    try {
      const res = await fetchBackendApiWrapper(
        `/room/${params.room[0]}/${params.room[1]}`,
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

  const roomData = await getRoomData();

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
