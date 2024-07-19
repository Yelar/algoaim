
import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import useSocketIO from "@/lib/hooks/useWebsocket";
import Link from "next/link";
import { FormEvent } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { useAudioRecorder } from "@/lib/hooks/useAudioRecorder";
import { useAudio } from "react-use";
// import "react-toastify/dist/ReactToastify.css";
import Message from "./Message";
import { StringToBoolean } from "class-variance-authority/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import RecordingIndicator from "./audioChat";

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
  const [currentStage, setCurrentStage] = useState(0);
  const { isRecording, audioBlob, startRecording, stopRecording, isPlaying, setIsPlaying, audioElement, setAudioElement, audioMode, setAudioMode } = useAudioRecorder();
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

      if (audioBlob !== null && !isRecording && (audioElement === null || audioElement.paused === true) && audioMode === true) {

        console.log("y");
        console.log(audioBlob);
        const requestBody = {
          chat: messages,
          currentStage: currentStage
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
          console.log(data.curMessage);
          const stream = await axios.get(`http://localhost:3002/api/v1/${data.curMessage}`);
          setAudioSrc(`http://localhost:3002/api/v1/${data.curMessage}`);
          // const audio = new Audio(`http://localhost:3002/api/v1/${data.curMessage}`);
          // await audio.play();
          if (data.isOver) {
            setCurrentStage(currentStage + 1);
            console.log(currentStage + 1);
          }
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
      console.log("it's playing");
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
    if (audioElement)
      console.log(audioElement.paused);
    
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
    <div>
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="text-lg font-semibold">AlgoAim</span>
          </Link>
          <nav className="hidden space-x-4 md:flex">
            
            <Link
              href="/eval"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
              prefetch={false}
            >
              Finish
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
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
        {!audioMode ? (<ul id="messages" className="flex-1 overflow-auto">
          {messages.map((cur, index) => (
            <Message key={index} role={cur.role} content={cur.content} />
          ))}
        </ul>
        ) : (
          <RecordingIndicator isRecording={isRecording}/>
        )}
        <div className="flex items-center space-x-4 p-2 border-t">
        <form id="form" action="" onSubmit={handleSend}>
    <label className="sr-only">Your message</label>
    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 flex-1 space-x-2">
        <input id="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></input>
            <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
            <span className="sr-only">Send message</span>
        </button>
    </div>
    <Button
            onClick={() => setAudioMode(!audioMode)}
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
          </Button>
</form>
          {/* <form id="form" action="" onSubmit={handleSend} className="flex-1 flex items-center space-x-2">
            <input
              id="input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Send</button>
          </form> */}
          
          
        </div>
      </div>

    </div>
    </div>
  );
};

export default Landing;