import { CompositeDecorator, Editor, EditorState, RichUtils } from "draft-js";
import { useState } from "react";
import Toolbar from "./Toolbar";
import "./index.css";
import "draft-js/dist/Draft.css";

const RichTextEditor = ({editorState, setEditorState}) => {
  const [showAdvOption, setShowAdvOption] = useState(false);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not handled";
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "superFancyBlockquote";
    }
    if (type === "code-block") {
      return "superFancyCodeBlock";
    }
  }

  const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styleMap.LINK}>
        {props.children}
      </a>
    );
  };
  
  const decorator = new CompositeDecorator([
    {
      strategy: (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges((char) => {
          const entityKey = char.getEntity();
          return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
        }, callback);
      },
      component: Link,
    },
  ]);

  const styleMap = {
    CODE: {
      color: "#999",
      fontFamily: "monospace",
      backgroundColor: "#e7e5e4",
      padding: "6px 4px",
    },
    LINK: {
      color: "#3b5998",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };

  return (
    <div
      id="draft-editor"
      className="flex flex-col justify-start items-start gap-4 px-4 py-4 border border-gray-300 rounded-2xl"
    >
      {showAdvOption && (
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
      )}
      <div className="w-full">
        <Editor
          editorState={editorState}
          onChange={(state) => setEditorState(EditorState.set(state, { decorator }))}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={myBlockStyleFn}
          customStyleMap={styleMap}
          decorators={[decorator]}
          placeholder="Type..."
        />
      </div>
      <div
        onClick={() => setShowAdvOption(!showAdvOption)}
        className={`flex justify-start items-start hover:bg-gray-200 px-2 py-1 rounded-full ${
          showAdvOption ? "font-bold text-gray-500" : "text-gray-400"
        } cursor-pointer`}
      >
        T
      </div>
    </div>
  );
};

export default RichTextEditor;
