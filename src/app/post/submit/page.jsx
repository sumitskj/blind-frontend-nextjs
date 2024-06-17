"use client";

import GoBack from "@/components/GoBack";
import {
  sendErrorNotification,
  sendSucessNotification,
} from "@/components/NotificationComponent";
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import { CircularProgress } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const RichTextEditor = dynamic(
  () => import("../../../components/editor/RichTextEditor"),
  {
    ssr: false,
  }
);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setTitleCount(title.length);
  }, [title]);

  const handlePostComment = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = stateToHTML(contentState);
    if (saving || title.length === 0) return;
    setSaving(true);
    try {
      const payload = {
        title: title,
        content: rawContentState,
      };
      const response = await fetchBackendApiWrapper(
        `/public/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
        null
      );
      if (response && response.ok) {
        const tmp = await response.json();
        sendSucessNotification({
          message: "Post published successfully",
        });
        router.replace(`/post/${tmp.post_id}`);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error("Error in creating post ", JSON.stringify(err));
      sendErrorNotification({
        message: "Error in creating post. Please try refreshing the page",
      });
    }
    setSaving(false);
  };

  return (
    <div className="no-scroll w-full px-6 pt-4 pb-10 h-dvh overflow-y-auto border border-gray-200 rounded-lg bg-white">
      <div className="w-full flex flex-col justify-start items-center gap-8 h-dvh">
        <div className="w-full flex justify-start items-center">
          <GoBack />
        </div>
        <div className="flex justify-start items-start w-full relative font-bold text-2xl">
          Create Public Post
        </div>
        <div className="text-sm text-gray-500 w-full">
          This will be a public post. If you want to create a invite only post
          then create a private discussion post.
        </div>
        <div className="flex flex-col justify-start items-stretch w-full gap-1">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="px-4 py-4 w-full rounded-3xl border border-gray-300"
            placeholder="Title"
          />
          <div className="w-full text-right text-xs text-gray-400">{`${titleCount}/300`}</div>
        </div>
        <div className="w-full">
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
        <div className="flex justify-end items-center w-full">
          <button
            onClick={handlePostComment}
            className="px-4 py-2 rounded-3xl text-sm text-white bg-blue-600 font-semibold"
          >
            {saving ? (
              <div className="flex justify-center items-center gap-2">
                <CircularProgress size={'18px'} color="inherit" />
                <div>Submitting</div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
