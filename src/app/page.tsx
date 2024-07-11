'use client'
import Image from "next/image";
import CodeEditorWindow from "./components/CodeEditorWindow";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import Message from "./components/Message";
import useSocketIO from "@/lib/hooks/useWebsocket";
import MicrophoneComponent from "./components/Dict";
import Landing from "./components/Landing";
import AudioRecorder from "./components/Recorder";
import MyHark from "./components/harkTest";

export default function Home() {
  const { messages, sendMessage, setMessages } = useSocketIO('http://localhost:3002');
  const [prompt, setPrompt] = useState('');

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
      conversation += `Keep in mind context. Answer to this:\n###\n ${prompt}.`
      console.log(conversation);
      
      sendMessage(conversation);
      // try {
      //   const response = await axios.post(`http://localhost:8080/api/v1/addMessage`, {
      //     message: "User: " + prompt,
      //   });
      //   console.log('Message posted successfully:', response.data);
      // } catch (error) {
      //   console.error('Failed to post message:', error);
      // }

      setPrompt('');
      
    }
  };
//   return (
//     <>
//       <ul id="messages">
//         {messages.map((cur, index) => (
//           <Message key={index} author = {cur.author} content={cur.content}/>
//         ))}
//       </ul>
//       <form id="form" action="" onSubmit={handleSend}>
//         <input
//           id="input"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
        

//         <button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
// </svg> </button>
//         <button type="submit">Send</button>
//       </form>
//     </>
//   );


  return(
    <Landing/>
  );

  // return(
  //   <>
  //     <MicrophoneComponent/>
  //   </>
  // )
}