'use client';
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

const CodeRenderer = ({ language, value }) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(`${value}`);
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full py-1">
      <div className="w-full bg-black flex flex-col justify-start items-start relative rounded-md">
        <div className="flex justify-between items-center w-full relative">
          <div className="text-xs py-1 px-4 text-white font-medium">
            {language}
          </div>
          <button
            onClick={copyCode}
            className="text-xs font-medium text-white py-1 px-4 flex justify-start items-center gap-1 cursor-pointer"
          >
            {!codeCopied && (
              <>
                <ContentCopyIcon fontSize="inherit" />
                <div>Copy</div>
              </>
            )}
            {codeCopied && (
              <>
                <DoneIcon fontSize="inherit" />
                <div>Copied</div>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          customStyle={{ margin: "0", width: "100%" }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const MarkdownRenderer = ({ text }) => {
  return (
    <div className="w-full font-poppins text-gray-600 text-sm">
      <ReactMarkdown
      className={'markdown-content'}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeRenderer
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
              />
            ) : (
              <code
                className={className}
                {...props}
                style={{
                  backgroundColor: "#d1d5db",
                  color: "black",
                  padding: '4px 4px',
                  borderRadius: "2px",
                  width: '100%',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
