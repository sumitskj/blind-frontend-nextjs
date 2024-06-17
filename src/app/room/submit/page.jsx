"use client";

import GoBack from "@/components/GoBack";
import {
  sendErrorNotification,
  sendSucessNotification,
} from "@/components/NotificationComponent";
import { fetchBackendApiWrapper } from "@/utils/apiWrapper";
import { CircularProgress } from "@mui/material";
import { EditorState } from "draft-js";
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

const CreateRoom = () => {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [titleCount, setTitleCount] = useState(0);
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
    if (saving || title.length === 0) return;
    setSaving(true);
    const contentState = editorState.getCurrentContent();
    const rawContentState = stateToHTML(contentState);
    try {
      const payload = {
        title: title,
        content: rawContentState,
      };
      const response = await fetchBackendApiWrapper(
        `/room`,
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
        router.replace(`/room/${tmp.room_id}/${tmp.password}`);
        sendSucessNotification({
          message: "Room published successfully",
        });
      } else {
        throw new Error(response);
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
    <div className="no-scroll w-full px-6 pt-4 pb-10 h-[86vh] overflow-y-auto border border-gray-200 rounded-lg bg-white">
      <div className="w-full flex flex-col justify-start items-center gap-8 h-full">
        <div className="w-full flex justify-start items-center">
          <GoBack />
        </div>
        <div className="flex justify-start items-start w-full relative font-bold text-2xl">
          Create Private Discussion Post
        </div>
        <div className="text-sm text-gray-500 w-full">
          This will create a private post, which only the people have the URL
          can access it
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
                <div>Creating</div>
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
