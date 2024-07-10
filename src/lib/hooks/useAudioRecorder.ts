// hooks/useAudioRecorder.ts
import { useState, useCallback} from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioBlob(event.data);
        };
        
        recorder.start();

        setIsRecording(true);
      })
      .catch(error => console.error('Error accessing microphone:', error));
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          setAudioBlob(event.data);
          console.log("bruh", audioBlob);
        };
      })
      .catch(error => console.error('Error accessing microphone:', error));
      setIsRecording(false);
      
    }
  }, [mediaRecorder]);
  return { isRecording, audioBlob, startRecording, stopRecording };
};