'use client'
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import useSocketIO from "@/lib/hooks/useWebsocket";
import { FormEvent } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { useAudioRecorder } from "@/lib/hooks/useAudioRecorder";
import { useAudio } from "react-use";
// import "react-toastify/dist/ReactToastify.css";
import Message from "./Message";
import { StringToBoolean } from "class-variance-authority/types";


interface OutputDetailsType {
  // Define the structure of outputDetails
  // Example:
  stdout: string;
  stderr: string;
  compile_output: string;
  memory: number;
  time: number;
}

interface msg {
  role: string;
  content: string;
}

function Landing(){
  // localStorage.clear();
  const { messages, sendMessage, setMessages } = useSocketIO('http://localhost:3002');
  const [prompt, setPrompt] = useState('');
  const { isRecording, audioBlob, startRecording, stopRecording, isPlaying, setIsPlaying, audioElement, setAudioElement } = useAudioRecorder();
  const [javascriptDefault, setJavascriptDefault] = useState(`/* 
    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]*/

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};
`);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, state, controls] = useAudio({
    src: audioSrc || '',
  });
  const [audioResBlob, setAudioResBlob] = useState<Blob | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    const processAudioBlob = async () => {

      if (audioBlob !== null && !isRecording) {
        console.log("y");
        console.log(audioBlob);
        const requestBody = {
          chat: messages,
        };
  
        try {
          await sendAudioToBackend();
          const res = await axios.post('http://localhost:3002/api/v1/response/', requestBody);
          
          const data = res.data;
          
          if (data.chat !== undefined) {
            const updatedMessages = [...messages, ...data.chat];
            setMessages(updatedMessages);
            localStorage.setItem("messages", JSON.stringify(messages));
          }
          const stream = await axios.get(`http://localhost:3002/api/v1/${data.curMessage}`);
          setAudioSrc(`http://localhost:3002/api/v1/${data.curMessage}`);
          // const audio = new Audio(`http://localhost:3002/api/v1/${data.curMessage}`);
          // await audio.play();
          console.log(messages);
        } catch (e) {
          console.log("Error:", e);
        }
      }
    };
  
    processAudioBlob();
  }, [isRecording]);

  useEffect(() => {
    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      setAudioElement(newAudio);
      newAudio.play().catch((error) => console.error('Error playing audio:', error));
    }
  }, [audioSrc]);


  useEffect(() => {
    startRecording();
    const storedMessages = localStorage.getItem("messages");
    console.log(storedMessages);
    if (storedMessages) {
      try {
        const parsedMessages: msg[] = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        } else {
          console.error("Stored messages are not an array");
          setMessages([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error parsing stored messages:", error);
        setMessages([]); // Fallback to empty array
      }
    }
  }, []);

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded_audio.wav');
      
      console.log("haha", audioBlob);
      
      const response = await axios.post('http://localhost:3002/api/v1/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Audio sent successfully');
      } else {
        console.error('Failed to send audio');
      }
    } catch (error) {
      console.error('Error sending audio:', error);
    } finally {
      setIsSending(false);
    }
  };

 

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() !== '') {
      let tmp = messages;
      tmp.push({role: "user", content: prompt});
      tmp.push({role: "assistant", content: ""});
      setMessages(tmp);
      let conversation = "Here is the previous conversation: ";
      for (let i = 0; i < messages.length - 1; i++) {
        conversation += messages[i].role + ": "
        conversation += messages[i].content;
        conversation += "\n";
      }
      conversation += `Keep in mind context. Answer to this:\n###\n ${prompt}. Here is current solution: ${code}`
      console.log(conversation);
      
      sendMessage(conversation);
      try {
        localStorage.setItem("messages", JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save messages:', error);
      }
      
      setPrompt('');
      
    }
  }
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
    // We will come to the implementation later
  };

  const checkStatus = async (token: string) => {
    // We will come to the implementation later
  };

  const handleThemeChange = (th: { value: string; label: string }) => {
    setTheme(th);
  };

  // const showSuccessToast = (msg?: string) => {
  //   toast.success(msg || `Compiled Successfully!`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  // // const showErrorToast = (msg?: string) => {
  // //   toast.error(msg || `Something went wrong! Please try again.`, {
  // //     position: "top-right",
  // //     autoClose: 1000,
  // //     hideProgressBar: false,
  // //     closeOnClick: true,
  // //     pauseOnHover: true,
  // //     draggable: true,
  // //     progress: undefined,
  // //   });
  // // };
  
  const handleClick = async () => {
    setClickCount(prevCount => 1 + prevCount);
    if (isRecording) {
      stopRecording();
      await sendAudioToBackend();
          const requestBody = {
            chat: messages,
          };
          try {
            const res = await axios.post('http://localhost:3002/api/v1/response/', requestBody);
          
            // Use res.data directly if it's already parsed
            const data = res.data;
          
            if (data.chat !== undefined) {
              setMessages(data.chat);
              localStorage.setItem("messages", JSON.stringify(data.chat));
            }
          
            console.log(messages);
            
          } catch (e) {
            console.log("Error:", e);
          }
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-4 overflow-auto">
        <CodeEditorWindow
          code={code}
          onChange={onChange}
          language={"cpp"}
          theme={theme.value}
        />
      </div>
      {/* Перед проигрывателем ставить надо */}
      {audio}
      <div className="w-1/2 p-4 overflow-auto flex flex-col">
        <ul id="messages" className="flex-1 overflow-auto">
          {messages.map((cur, index) => (
            <Message key={index} role={cur.role} content={cur.content} />
          ))}
        </ul>
        <div className="flex items-center space-x-4 p-2 border-t">
          <form id="form" action="" onSubmit={handleSend} className="flex-1 flex items-center space-x-2">
            <input
              id="input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Send</button>
          </form>
          <button
            onClick={handleClick}
            className={`bg-red-${isRecording ? 400 : 100} p-2 rounded`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Landing;