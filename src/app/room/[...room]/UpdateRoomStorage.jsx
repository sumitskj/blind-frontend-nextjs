"use client";

const { useEffect } = require("react");

const UpdateRoomStorage = ({ data }) => {
  useEffect(() => {
    let roomStorage = JSON.parse(localStorage.getItem("recentRooms"));
    if (roomStorage) {
      const tmp = roomStorage.find((x) => x.id === data.id);
      if (!tmp) {
        roomStorage = [data, ...roomStorage];
      }
    } else {
      roomStorage = [data];
    }
    localStorage.setItem("recentRooms", JSON.stringify(roomStorage));
  }, []);
  return <></>;
};

export default UpdateRoomStorage;
