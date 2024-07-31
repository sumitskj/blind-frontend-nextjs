"use client";

const { useEffect } = require("react");

const UpdateArticleStorage = ({ data }) => {
  useEffect(() => {
    let postStorage = JSON.parse(localStorage.getItem("recentArticles"));
    if (postStorage) {
      const tmp = postStorage.find((x) => x.id === data.id);
      if (!tmp) {
        postStorage = [data, ...postStorage];
      }
    } else {
      postStorage = [data];
    }
    localStorage.setItem("recentArticles", JSON.stringify(postStorage));
  }, []);
  return <></>;
};

export default UpdateArticleStorage;
