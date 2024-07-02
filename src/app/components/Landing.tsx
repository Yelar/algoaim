'use client'
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const javascriptDefault = `// some comment`;

interface OutputDetailsType {
  // Define the structure of outputDetails
  // Example:
  stdout: string;
  stderr: string;
  compile_output: string;
  memory: number;
  time: number;
}

const Landing: React.FC = () => {
  const [code, setCode] = useState<string>(javascriptDefault);
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState<OutputDetailsType | null>(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<{ value: string; label: string }>({ value: "cobalt", label: "Cobalt" });



  const onChange = (action: string, data: string | undefined) => {
    switch (action) {
      case "code": {
        setCode(data || "");
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    // We will come to the implementation later in the code
  };

  const checkStatus = async (token: string) => {
    // We will come to the implementation later in the code
  };

  const handleThemeChange = (th: { value: string; label: string }) => {
    setTheme(th);
  };

  const showSuccessToast = (msg?: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg?: string) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={"cpp"}
            theme={theme.value}
        />
    </>
  );
};

export default Landing;