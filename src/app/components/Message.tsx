
import React from 'react';

interface msgProps {
    role: string;
    content: string;
}

const Message = (props: msgProps) => {
  const {role, content} = props;

  const preprocessContent = (text: string) => {
    return text;
  };

  const processedContent = preprocessContent(content);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <div className={`flex items-start gap-4 ${role === "user" ? "justify-end" : ""}`}>
        <div 
          className={`rounded-lg p-3 max-w-[70%] overflow-auto ${
            role === "user" ? "bg-blue-500 text-white" : "bg-gray-600 text-white"
          }`}
        >
          <div 
            className="text-sm prose dark:prose-invert max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;