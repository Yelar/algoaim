
import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import useSocketIO from "@/lib/hooks/useWebsocket";
import Link from "next/link";
import { FormEvent } from "react";
// import { ToastContainer, toast } from "react-toastify";
import { useAudioRecorder } from "@/lib/hooks/useAudioRecorder";
import { useAudio } from "react-use";
// import "react-toastify/dist/ReactToastify.css";
import Editor from "@monaco-editor/react";
import Message from "./Message";
import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import RecordingIndicator from "./audioChat";
import { Logo } from "../page";

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

function Landing({title} : any){
  // localStorage.clear();
  const router = useRouter();
  const {messages, sendMessage, setMessages,currentStage, setCurrentStage } = useSocketIO('https://iphone-scrapping-production.up.railway.app');
  const [prompt, setPrompt] = useState('');
  const [solution, setSolution] = useState<string>("");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState<string>("//Content is loading...");
  const { isRecording, audioBlob, startRecording, stopRecording, isPlaying, setIsPlaying, audioElement, setAudioElement, audioMode, setAudioMode } = useAudioRecorder();
  const [javascriptDefault, setJavascriptDefault] = useState(`Content is loading...
` );
  const [loading, setLoading] = useState(true);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, state, controls] = useAudio({
    src: audioSrc || '',
  });
  const [audioResBlob, setAudioResBlob] = useState<Blob | null>(null);
  const isSending = useRef(false);
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // Set initial time left in seconds

  useEffect(() => {
    const timeObject = localStorage.getItem("time");
    if (timeObject)
    // console.log(timeObject);

    
    if (timeObject) {
      setTimeLeft(JSON.parse(timeObject).time);
      
    }
    
      

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          //console.log(prev);
          // console.log(audioElement);
          // console.log(audioElement?.paused);
          
      if (prev % 10 == 0)
      localStorage.setItem("time", JSON.stringify({time: prev}));

          return prev - 1;
        } else {
          router.push(`/dashboard/problems/${title}/eval`);
          clearInterval(timer);
          return 0;
        }
      });
      
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    if (timeLeft % 10 == 0)
    localStorage.setItem("time", JSON.stringify({time: timeLeft}));
  }, [timeLeft]);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    const processAudioBlob = async () => {
      
      if (audioBlob != null && !isRecording && (audioElement == null || audioElement.paused == true) && audioMode == true && isSending.current == false) {
        // console.log("sending...",  audioElement?.paused);
        // console.log("isSending: ", isSending.current);
        isSending.current = true;
        //console.log("y");
        //console.log(audioBlob);
        let reader = new FileReader();
        reader.readAsDataURL(audioBlob);
    let base64 = "";
    reader.onloadend = async function () {
      let base64String = reader.result;
      const requestBody = {
        base64: base64String,
        chat: messages,
        currentStage: currentStage,
        code: code,
        solution: solution
      };
      
      try {
        
        const res = await axios.post('https://iphone-scrapping-production.up.railway.app/api/v1/response/', requestBody);
        
        const data = res.data;
        if (data.chat[0].message == '') {
          return;
        }
        if (data.chat !== undefined) {
          const updatedMessages = [...messages, ...data.chat];
          setMessages(updatedMessages);
          localStorage.setItem("messages", JSON.stringify(messages));
        }
        //console.log(data.curMessage);
        const stream = await axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${data.curMessage}`);
        setAudioSrc(`https://iphone-scrapping-production.up.railway.app/api/v1/${data.curMessage}`);
        const audio = new Audio(`https://iphone-scrapping-production.up.railway.app/api/v1/${data.curMessage}`);
        setAudioElement(audio);
        audio.play();
        if (data.isOver) {
          setCurrentStage(currentStage + 1);
          //console.log("Stage: ", currentStage + 1);
        }
        isSending.current = false;
        //console.log(messages);
      } catch (e) {
        //console.log("Error:", e);
      }
    } 
    
      }
    };
    
    
    processAudioBlob();
  }, [isRecording]);
  
  // useEffect(() => {
  //   if (audioSrc) {
  //     const newAudio = new Audio(audioSrc);
  //     setAudioElement(newAudio);
  //     newAudio.play().catch((error) => console.error('Error playing audio:', error));
  //     //console.log("it's playing");
  //   }
  // }, [audioSrc]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Fetch stored messages from local storage
        const storedMessages = localStorage.getItem("messages");
        const storedCode = localStorage.getItem("code");
        const storedSolution = localStorage.getItem("solution");
        if (storedMessages && storedCode && storedSolution) {
          try {
            const parsedMessages: msg[] = JSON.parse(storedMessages);
            const parsedCode: any = JSON.parse(storedCode);
            const parsedSolution: any = JSON.parse(storedSolution);
            setCode(parsedCode.code);
            
            setSolution(parsedSolution.solution);
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
          setLoading(false);
        } else {
        // Push all requests into reqPromises
        const reqPromises: Promise<any>[] = [
          axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${title}/description`),
          axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${title}/snippets`),
          axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${title}/solution`)
        ];
        
        // Wait for all requests to complete
        const [descriptionResponse, snippetsResponse, solutionResponse] = await Promise.all(reqPromises);

        const description = descriptionResponse.data.content;
        const snippets = snippetsResponse.data.snippets[0].code;
        const sol = solutionResponse.data.solution;

        setMessages([
          { role: "assistant", content: "Hello, I am your interviewer. Today, you will have 30 minutes to solve this problem:" },
          { role: "assistant", content: description },
          { role: "assistant", content: "Once you are ready, you can start explaining your approach" }
        ]);

        //console.log("Snippets:", snippets);
        //console.log("Solution:", sol);

        setSolution(sol);
        setCode(snippets);

        localStorage.setItem("solution", JSON.stringify({ solution: sol }));
        localStorage.setItem("code", JSON.stringify({ lang: "cpp", code: snippets }));
        setLoading(false);
        setTimeLeft(1800);
}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // const sendAudioToBackend = async () => {
  //   if (!audioBlob) return;

  //   setIsSending(true);

  //   try {
  //     const formData = new FormData();
  //     formData.append('audio', audioBlob, 'recorded_audio.wav');
      
  //     //console.log("haha", audioBlob);
      
  //     const response = await axios.post('https://iphone-scrapping-production.up.railway.app/api/v1/upload/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     if (response.status === 200) {
  //       //console.log('Audio sent successfully');
  //     } else {
  //       console.error('Failed to send audio');
  //     }
  //   } catch (error) {
  //     console.error('Error sending audio:', error);
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

 useEffect(() => {
    // console.log("changed", audioMode);
    if (audioMode) {
      
      startRecording();
    } else {
      
      stopRecording();
    }
 }, [audioMode]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() !== '') {
      let tmp = messages;
      tmp.push({role: "user", content: prompt});
      setMessages(tmp);
      
      sendMessage(code, solution);
      try {
        localStorage.setItem("messages", JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save messages:', error);
      }
      
      setPrompt('');
      
    }
  }
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState<OutputDetailsType | null>(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<{ value: string; label: string }>({ value: "cobalt", label: "Cobalt" });

  const onChange = (action: string, data: string | undefined) => {
    switch (action) {
      case "code": {
        setCode(data || "");
        localStorage.setItem("code", JSON.stringify({lang: language, code: data}));
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
      //console.log(audioElement.paused);
    
    if (isRecording) {
      stopRecording();
          const requestBody = {
            chat: messages,
          };
          try {
            const res = await axios.post('https://iphone-scrapping-production.up.railway.app/api/v1/response/', requestBody);
          
            // Use res.data directly if it's already parsed
            const data = res.data;
          
            if (data.chat !== undefined) {
              setMessages(data.chat);
              localStorage.setItem("messages", JSON.stringify(data.chat));
            }
          
            //console.log(messages);
            
          } catch (e) {
            //console.log("Error:", e);
          }
    } else {
      startRecording();
    }
  };
  const onLanguageChange= async (value:any) => {
    let id = 0;
    const snippets = await axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${title}/snippets`);
    const defaultCode =snippets.data.snippets;
    //console.log("blya", snippets.data.snippets[0].code);
    for (let i = 0; i < 10; i++) {
      if (defaultCode[i].langSlug === value) {
        id = i;
        break;
      }
    }
    setLanguage(value);
    setCode(snippets.data.snippets[id].code);
    localStorage.setItem("code", JSON.stringify({lang: value, code: snippets.data.snippets[id].code}));
  };
  const handleEditorChange = (value : any) => {
    setCode(value);
    onChange("code", value);
    //console.log(value);
    localStorage.setItem("code", JSON.stringify({lang: language, code: value}));
  };
  const [activeTab, setActiveTab] = useState('editor');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div>
    {audio}
    {loading && 
        <div className="text-white flex flex-col w-full h-screen items-center justify-center bg-gray-900 p-4">

<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div></div>
}
    {!loading && <div className="h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
            <Logo themeProp={true}/>
            
          </Link>
          <div className="absolute top-0 mx-auto pt-6 left-1/2 flex justify-center text-2xl font-semibold text-white">{formatTime(timeLeft)}</div>
          <nav className="space-x-4" >
            
            <Link
              href={`/dashboard/problems/${title}/eval`}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/90  text-white bg-purple-400 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
              prefetch={false}
            >
              Finish
            </Link>
          </nav>
        </div>
      </header>
      {isMobile && (
        <div className="flex justify-center space-x-4 mt-4 py-1">
          <Button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded ${
              activeTab === 'editor' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            Editor
          </Button>
          <Button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded ${
              activeTab === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            Chat
          </Button>
        </div>
      )}
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
      
      <div 
        className={`w-full md:w-1/2 flex-auto ${isMobile && activeTab !== 'editor' ? 'hidden' : ''}`}
      >
        <Select onValueChange={onLanguageChange} defaultValue="cpp">
      <SelectTrigger className="w-[180px] text-white bg-slate-600">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className=" bg-slate-600">Language</SelectLabel>
          <SelectItem className="text-white bg-slate-600" value="cpp">C++</SelectItem>
          <SelectItem className="text-white bg-slate-600" value="java">Java</SelectItem>
          <SelectItem className="text-white bg-slate-600" value="python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="100vh"
        width={`100%`}
        language={language}
        value={code}
        theme={"vs-dark"}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>

      </div>
      <div 
        className={`w-full md:w-1/2 h-full flex flex-col ${isMobile && activeTab !== 'chat' ? 'hidden' : ''}`}
      >
        {!audioMode ? (<ul id="messages" className="flex-1 overflow-auto">
          {messages.map((cur, index) => (
            <Message key={index} role={cur.role} content={cur.content} />
          ))}
          
        </ul>
        ) : (
          <RecordingIndicator isRecording={isRecording}/>
        )}
        
        <div className="flex items-center space-x-4 p-2 border-t">
          
        <form className="w-full flex flex-row items-center" action="" onSubmit={handleSend}>
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
        </div>

      </div>

      
    </div>
    
    </div>}
    </div>
  );
};

export default Landing;