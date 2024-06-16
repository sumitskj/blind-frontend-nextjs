"use client";

const { useEffect } = require("react");

const UpdatePostStorage = ({ data }) => {
  useEffect(() => {
    let postStorage = JSON.parse(localStorage.getItem("recentPosts"));
    if (postStorage) {
      const tmp = postStorage.find((x) => x.id === data.id);
      if (!tmp) {
        postStorage = [data, ...postStorage];
      }
    } else {
      postStorage = [data];
    }
    localStorage.setItem("recentPosts", JSON.stringify(postStorage));
  }, []);
  return <></>;
};

export default UpdatePostStorage;
