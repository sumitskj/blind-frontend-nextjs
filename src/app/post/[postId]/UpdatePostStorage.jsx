"use client";

const { useEffect } = require("react");

const UpdatePostStorage = ({ data }) => {
  useEffect(() => {
    let roomStorage = JSON.parse(localStorage.getItem("recentPosts"));
    if (roomStorage) {
      const tmp = roomStorage.find((x) => x.id === data.id);
      if (!tmp) {
        roomStorage = [...roomStorage, data];
      }
    } else {
      roomStorage = [data];
    }
    localStorage.setItem("recentPosts", JSON.stringify(roomStorage));
  }, []);
  return <></>;
};

export default UpdatePostStorage;
