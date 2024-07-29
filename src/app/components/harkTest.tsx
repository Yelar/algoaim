'use client'
import React, { useState } from 'react';
import axios from 'axios';
import hark from 'hark';
import { Button } from '@/components/ui/button';

let mediaRecorder: MediaRecorder | null = null;

export default function MyHark() {
  const [messages, setMessages] = useState<any[]>([]);

  const record = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      //console.log("Starting to record");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        mediaRecorder = new MediaRecorder(stream);
        const speech = hark(stream, {});

        speech.on("speaking", () => {
          //console.log("Speaking!");
          if (mediaRecorder && mediaRecorder.state === "inactive") {
            mediaRecorder.start();
          }
        });

        speech.on("stopped_speaking", () => {
          //console.log("Not Speaking");
          if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
          }
        });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            //console.log("blobblob");
            const blob = e.data;
            //console.log(blob);
            // Handle the blob data (e.g., upload to server, save locally, etc.)
          }
        };
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    } else {
      //console.log("Recording not supported");
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      if (mediaRecorder.state === "recording") mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <>
      <Button onClick={record}>Record</Button>
      <Button onClick={stopRecording}>Stop</Button>
    </>
  );
}