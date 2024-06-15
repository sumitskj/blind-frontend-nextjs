import React, { useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import Image from "next/image";
import { Dialog } from "@mui/material";

const CustomPrompt = ({ open, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleClose = (result) => {
    onClose(result ? inputValue : null);
    setInputValue('');
  };

  return (
    <Dialog open={open} onClose={() => handleClose(null)} fullWidth>
      <div className="w-full flex flex-col justify-stretch items-start gap-4 p-4">
        <div className="font-medium text-center w-full">Enter Link</div>
        <div className="w-full border border-gray-400 rounded-md">
          <input
            type="text"
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-2 py-2 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center gap-4 w-full">
          <button
            onClick={() => handleClose(null)}
            className="border border-black rounded-md font-medium text-sm px-2 py-1"
          >
            Cancel
          </button>
          <button
            onClick={() => handleClose(true)}
            className="bg-green-500 text-white rounded-md font-medium text-sm px-2 py-1"
          >
            Ok
          </button>
        </div>
      </div>
    </Dialog>
  );
};

const Toolbar = (props) => {
  const { editorState, setEditorState } = props;
  const [promptOpen, setPromptOpen] = useState(false);
  const [linkSelection, setLinkSelection] = useState(null);

  const inlineStyles = [
    {
      type: "BOLD",
      icon: "/assets/bold-icon.png",
      label: "B",
      toolTip: "Bold",
    },
    {
      type: "ITALIC",
      icon: "/assets/italic-icon.png",
      label: "I",
      toolTip: "Italic",
    },
    {
      type: "UNDERLINE",
      icon: "/assets/underline-icon.png",
      label: "U",
      toolTip: "Underline",
    },
    {
      type: "STRIKETHROUGH",
      icon: "/assets/strikethrough-icon.png",
      label: "S",
      toolTip: "Strikethrough",
    },
    {
      type: "CODE",
      icon: "/assets/code-icon.png",
      label: "<c>",
      toolTip: "Code Block",
    }
  ];

  const blockStyles = [
    {
      type: "blockquote",
      icon: "/assets/quote-icon.png",
      label: "Unordered List",
      toolTip: "Unordered List",
    },
    {
      type: "unordered-list-item",
      icon: "/assets/orderedlist-icon.png",
      label: "Unordered List",
      toolTip: "Unordered List",
    },
    {
      type: "ordered-list-item",
      icon: "/assets/orderedlist-icon.png",
      label: "Ordered List",
      toolTip: "Ordered List",
    },
    {
      type: "code-block",
      icon: "/assets/codeblock-icon.png",
      label: "Code Block",
      toolTip: "Code Block",
    },
  ];

  const handleInlineStyle = (event, style) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleBlockStyle = (event, block) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const renderInlineStyleButton = (style, index) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    let className = "toolbar-button";
    if (currentInlineStyle.has(style.type)) {
      className = "toolbar-button-selected";
    }

    return (
      <button
        key={index}
        title={style.toolTip}
        onMouseDown={(event) => handleInlineStyle(event, style.type)}
        onClick={(event) => event.preventDefault()}
        className={`${
          className === "toolbar-button-selected" ? "bg-gray-200" : ""
        } px-2 py-2 rounded-full hover:bg-gray-100`}
      >
        <Image src={style.icon} width={12} height={12} alt={style.label} />
      </button>
    );
  };

  const renderBlockStyleButton = (block, index) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    let className = "toolbar-button";
    if (currentBlockType === block.type) {
      className = "toolbar-button-selected";
    }

    return (
      <button
        key={index}
        title={block.toolTip}
        onMouseDown={(event) => handleBlockStyle(event, block.type)}
        onClick={(event) => event.preventDefault()}
        className={`${
          className === "toolbar-button-selected" ? "bg-gray-200" : ""
        } px-2 py-2 rounded-full hover:bg-gray-100`}
      >
        <Image src={block.icon} width={12} height={12} alt={block.label} />
      </button>
    );
  };

  const handleLinkClick = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setLinkSelection(selection);
      setPromptOpen(true);
    }
  };

  const handlePromptClose = (url) => {
    setPromptOpen(false);
    if (url) {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
      });

      setEditorState(
        RichUtils.toggleLink(
          newEditorState,
          linkSelection,
          entityKey
        )
      );
    }
  };

  return (
    <div id="editor-toolbar" className="flex justify-start items-center gap-2">
      {inlineStyles.map((style, index) => {
        return renderInlineStyleButton(style, index);
      })}
      {blockStyles.map((block, index) => {
        return renderBlockStyleButton(block, index);
      })}
      <button
        title="Link"
        onMouseDown={handleLinkClick}
        onClick={(event) => event.preventDefault()}
        className="px-2 py-2 rounded-full hover:bg-gray-100"
      >
        <Image src="/assets/link-icon.png" width={12} height={12} alt="Link" />
      </button>
      <CustomPrompt open={promptOpen} onClose={handlePromptClose} />
    </div>
  );
};

export default Toolbar;
