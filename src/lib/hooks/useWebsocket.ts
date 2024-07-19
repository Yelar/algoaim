'use client';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface msg {
    role: string;
    content: string;
}

const useSocketIO = (url: string) => {
  const [messages, setMessages] = useState<msg[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);

    socket.on('connect', () => {
      console.log('Socket.IO connection opened');
    });
    
    socket.on('message', (data: msg) => {
      const additionalString = ""; // Define the string to append

      setMessages(prevMessages => {
        const lastMessage = prevMessages[prevMessages.length - 1].content + data.content;
        const tmp = [...prevMessages.slice(0, -1), {role: prevMessages[prevMessages.length - 1].role,
            content: lastMessage
        }];
        localStorage.setItem("messages", JSON.stringify(tmp));
        return tmp;
      });
    });

    socket.on('error', (error: any) => {
      console.error('Socket.IO error:', error);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('message', message);
    } else {
      console.error('Socket.IO is not connected');
    }
  };

  return { messages, sendMessage, setMessages };
};

export default useSocketIO;