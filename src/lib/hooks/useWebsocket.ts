'use client';
import { Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface msg {
    role: string;
    content: string;
}

const useSocketIO = (url: string) => {
  const [messages, setMessages] = useState<msg[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    const socket = io(url);

    socket.on('connect', () => {
      // console.log('Socket.IO connection opened');
    });
    
    socket.on('message', (data: any) => {
      const additionalString = ""; // Define the string to append

      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1].content + data.content;
        const tmp = [...prevMessages, {role: "assistant",
            content: data.Response
        }];
        console.log(data.Response);
        localStorage.setItem("messages", JSON.stringify(tmp));
        return tmp;
      });
      // console.log(data);
      
    });

    socket.on('error', (error: any) => {
      console.error('Socket.IO error:', error);
    });

    socket.on('disconnect', () => {
      // console.log('Socket.IO connection closed');
    });

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (code : string, solution : string) => {
    if (socketRef.current?.connected) {
      const requestBody = {
        chat: messages,
        currentStage: currentStage, 
        code: code,
        solution: solution
      };
      socketRef.current.emit('message', requestBody);
    } else {
      console.error('Socket.IO is not connected');
    }
  };

  return { messages, sendMessage, setMessages, currentStage, setCurrentStage};
};

export default useSocketIO;