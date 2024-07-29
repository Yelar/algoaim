'use client'
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { log } from "console";


interface codeEditorProps {
    onChange: any;
    language : any;
    code : any;
    theme: any;
}

const CodeEditorWindow = (props : codeEditorProps) => {
  const { onChange, language, code, theme } = props;
  const [value, setValue] = useState(code || "");
  useEffect(() => {
    setValue(code);
  }, [])
  const handleEditorChange = (value : any) => {
    setValue(value);
    onChange("code", value);
    //console.log(value);
    
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="100vh"
        width={`100%`}
        language={language || "cpp"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;