"use client";

const { useEffect } = require("react");

const UpdateRoomStorage = ({ data }) => {
  useEffect(() => {
    let roomStorage = JSON.parse(localStorage.getItem("roomData"));
    if (roomStorage) {
      const tmp = roomStorage.find((x) => x.id === data.id);
      if (!tmp) {
        roomStorage = [...roomStorage, data];
      }
    } else {
      roomStorage = [data];
    }
    localStorage.setItem("roomData", JSON.stringify(roomStorage));
  }, []);
  return <></>;
};

export default UpdateRoomStorage;
