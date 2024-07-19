import { useState, useCallback } from 'react';
import hark from 'hark';


export const useAudioRecorder = () => {
  const [audioMode, setAudioMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const startRecording = useCallback(async () => {
    
    // navigator.mediaDevices.getUserMedia({ audio: true })
    //   .then(stream => {
    //     const recorder = new MediaRecorder(stream);
    //     setMediaRecorder(recorder);

    //     recorder.ondataavailable = (event) => {
    //       if (event.data.size > 0) {
    //         setAudioBlob(event.data);
    //       }
    //     };

    //     recorder.onstop = () => {
    //       setIsRecording(false);
    //       console.log("stopped");
    //     };

    //     recorder.start();
    //     setIsRecording(true);
    //   })
    //   .catch(error => console.error('Error accessing microphone:', error));
    if (navigator.mediaDevices.getUserMedia) {
      console.log("Starting to record");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        const speech = hark(stream, {interval: 50});
        if(audioElement?.ended || audioElement === null) {
        speech.on("speaking", () => {
          
            console.log('NIGGGGAAAA');
          console.log("Speaking!");
            recorder.start();
            speech.setInterval(50);
          setIsRecording(true);
        });
      }

        speech.on("stopped_speaking", () => {
          console.log("Not Speaking");
            recorder.stop();
            speech.setInterval(50);
          setIsRecording(false);
        });
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            const blob = e.data;
            setAudioBlob(blob);
            console.log(blob);
            
            // Handle the blob data (e.g., upload to server, save locally, etc.)
          }
        };
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    } else {
      console.log("Recording not supported");
    }
    
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  return { isRecording, audioBlob, startRecording, stopRecording, isPlaying, setIsPlaying, audioElement, setAudioElement, audioMode, setAudioMode};
};