'use client'
import React, { useState } from "react";
import Editor from "@monaco-editor/react";


interface codeEditorProps {
    onChange: any;
    language : any;
    code : any;
    theme: any;
}

const CodeEditorWindow = (props : codeEditorProps) => {
  const { onChange, language, code, theme } = props;
  const [value, setValue] = useState(code || "");
  
  const handleEditorChange = (value : any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="100vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;