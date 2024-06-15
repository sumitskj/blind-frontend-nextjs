"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { format } from "timeago.js";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { sendErrorNotification } from "./NotificationComponent";
import LoadingPageSkeleton from "@/components/CommentSection";
import { fetchBackendApiWrapper } from "../utils/apiWrapper";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { UserNames } from "@/utils/userNames";
const RichTextEditor = dynamic(() => import("./editor/RichTextEditor"), {
  ssr: false,
});

const CommentSection = ({ entityId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);
  const [newRootCommentId, setNewRootCommentId] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (refreshComments) {
      fetchComments();
      setRefreshComments(false);
    }
  }, [refreshComments]);

  const fetchComments = async () => {
    try {
      const response = await fetchBackendApiWrapper(
        `/comment/${entityId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
        null
      );
      if (response && response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error("Error in loading comments ", JSON.stringify(err));
      toast("Error in fetching comments");
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="flex flex-col justify-start items-center w-full p-8 gap-8">
          <LoadingPageSkeleton />
        </div>
      )}
      {!loading && (
        <div className="flex flex-col justify-start items-start w-full p-8 gap-8 bg-white min-h-screen  border border-gray-200 rounded-b-lg">
          <div className="text-lg font-semibold">Comments</div>
          <CommentBox
            entityId={entityId}
            parentId={null}
            setRefreshComments={setRefreshComments}
            setNewRootCommentId={setNewRootCommentId}
          />
          {comments && comments.length > 0 && (
            <CommentList
              comments={comments}
              setRefreshComments={setRefreshComments}
              entityId={entityId}
              newRootCommentId={newRootCommentId}
            />
          )}
          {comments.length === 0 && (
            <div className="w-full text-center text-gray-500 text-sm">
              {`No Comment's yet. Be the first one to start this legendary thread`}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const CommentBox = ({
  entityId,
  parentId,
  setRefreshComments,
  setNewRootCommentId,
}) => {
  const [loader, setLoader] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handlePostComment = async () => {
    const contentState = editorState.getCurrentContent();
    if (loader || contentState.length === 0) return;
    const rawContentState = stateToHTML(contentState);
    setLoader(true);
    try {
      const payload = {
        entity_id: entityId,
        parent_id: parentId,
        content: rawContentState,
      };
      const response = await fetchBackendApiWrapper(
        `/comment`,
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
        setEditorState(EditorState.createEmpty());
        setRefreshComments(true);
        setNewRootCommentId(tmp.id);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log("Error in posting comment ", JSON.stringify(err));
      sendErrorNotification({
        message: "Error in posting comment. Please try refreshing the page",
      });
    }
    setLoader(false);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      <div
        className="flex flex-col justify-start items-start w-full rounded-3xl gap-2"
      >
        <div className="w-full" id={"textarea"}>
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
        <div className="flex justify-end items-center gap-4 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePostComment();
            }}
            className="text-sm bg-blue-500 text-white p-1 rounded-lg w-24"
          >
            {loader && (
              <>
                <CircularProgress
                  size="1rem"
                  variant="indeterminate"
                  color="inherit"
                />
              </>
            )}
            {!loader && <p>Comment</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReplyBox = ({
  entityId,
  parentId,
  setRefreshComments,
  setShowReplyInput,
  handleNewReply,
  setShowReply,
}) => {
  const [loader, setLoader] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handlePostComment = async () => {
    const contentState = editorState.getCurrentContent();
    if (loader || contentState.length === 0) return;
    const rawContentState = stateToHTML(contentState);
    setLoader(true);
    try {
      const payload = {
        entity_id: entityId,
        parent_id: parentId,
        content: rawContentState,
      };
      const response = await fetchBackendApiWrapper(
        `/comment`,
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
        setEditorState(EditorState.createEmpty());
        setShowReplyInput(false);
        setRefreshComments(true);
        handleNewReply();
        setShowReply(true);
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error("Error in posting reply comment ", JSON.stringify(err));
      sendErrorNotification({
        message: "Error in posting comment. Please try refreshing the page",
      });
    }
    setLoader(false);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      <div
        onClick={() => document.getElementById(parentId).focus()}
        className="flex flex-col justify-start items-start w-full rounded-lg p-2 gap-2"
      >
        <div className="w-full" id={parentId}>
          <RichTextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
        <div className="flex justify-end items-center gap-4 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowReplyInput(false);
            }}
            className="border rounded-lg border-gray-300 text-sm p-1"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePostComment();
            }}
            className="text-sm bg-blue-500 text-white p-1 rounded-lg w-24"
          >
            {loader && (
              <>
                <CircularProgress
                  size="1rem"
                  variant="indeterminate"
                  color="inherit"
                />
              </>
            )}
            {!loader && <p>Comment</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full p-2 text-white font-bold`} style={{backgroundColor : `${randomColor()}`}}>
      {}
    </div>
  );
};

const randomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const Comment = ({
  comment,
  replies,
  setRefreshComments,
  entityId,
  newRootCommentId,
}) => {
  const [showReply, setShowReply] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isNewComment, setIsNewComment] = useState(
    comment.id === newRootCommentId ? true : false
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNewComment(false);
    }, 5000); // Reset isNewComment to false after 5 seconds

    return () => clearTimeout(timer); // Clean up the timeout on unmount
  }, [isNewComment]);

  const handleNewReply = () => {
    setIsNewComment(true);
  };

  const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * UserNames.length);
    return UserNames[randomIndex];
  };

  return (
    <>
      <div
        className={`flex justify-start items-start w-full py-4 px-2 gap-4 text-sm ${
          isNewComment ? "bg-yellow-100" : ""
        }`}
      >
        <div
          className="flex flex-col justify-start items-start w-full gap-4 pl-2 rounded-md p-1"
          style={{ border: `1px solid ${randomColor()}` }}
        >
          <div className="flex justify-between items-center w-full">
            <div className="font-semibold">{getRandomUsername()}</div>
            <div className="text-xs">{format(new Date(comment.time))}</div>
          </div>
          <div
            className="post-content w-full text-sm"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>
          <div className="flex justify-start items-center w-full whitespace-nowrap gap-4">
            {replies.length > 0 && (
              <div
                onClick={() => setShowReply(!showReply)}
                className="flex gap-1 justify-center items-center text-gray-500 cursor-pointer"
              >
                <div>{comment.reply.length} Replies</div>
                {showReply && (
                  <KeyboardArrowDownRoundedIcon
                    className="text-gray-400"
                    fontSize="small"
                  />
                )}
                {!showReply && (
                  <KeyboardArrowUpRoundedIcon
                    className="text-gray-400"
                    fontSize="small"
                  />
                )}
              </div>
            )}
            <div className="flex justify-end items-center gap-4">
              <div
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex gap-1 justify-center items-center cursor-pointer"
              >
                <ReplyRoundedIcon fontSize="small" className="text-gray-400" />
                <div className="text-gray-500">Reply</div>
              </div>
            </div>
          </div>
          {showReplyInput && (
            <div className="comment-reply-form mt-4 w-full">
              <ReplyBox
                entityId={entityId}
                parentId={comment.id}
                setRefreshComments={setRefreshComments}
                setShowReplyInput={setShowReplyInput}
                handleNewReply={handleNewReply}
                setShowReply={setShowReply}
              />
            </div>
          )}
          {showReply && (
            <div className="w-full">
              {replies.length > 0 && (
                <div className="comment-replies">
                  {comment.reply.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      replies={reply.reply || []}
                      entityId={entityId}
                      setRefreshComments={setRefreshComments}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CommentList = ({
  comments,
  setRefreshComments,
  entityId,
  newRootCommentId,
}) => {
  const renderComments = (comments, setRefreshComments) => {
    return comments.map((comment) => (
      <div key={comment.id} className="w-full bg-white border-b border-slate-200">
        <Comment
          comment={comment}
          replies={comment.reply || []}
          setRefreshComments={setRefreshComments}
          entityId={entityId}
          newRootCommentId={newRootCommentId}
        />
      </div>
    ));
  };

  return (
    <div className="comment-list w-full flex flex-col justify-start items-start">
      {renderComments(comments, setRefreshComments)}
    </div>
  );
};

export default CommentSection;
