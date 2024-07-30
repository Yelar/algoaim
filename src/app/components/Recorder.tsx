'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAudioRecorder } from '@/lib/hooks/useAudioRecorder';
import { useAudio } from 'react-use'

const AudioRecorder: React.FC = () => {
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audio, state, controls] = useAudio({
    src: audioSrc || '',
  });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (audioBlob) {
      setAudioSrc(URL.createObjectURL(audioBlob));
    }
  }, [audioBlob]);

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recorded_audio.wav');
      
      const response = await axios.post('https://iphone-scrapping-production.up.railway.app/api/v1/interview/', formData, {
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

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex space-x-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded-full ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white focus:outline-none`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioSrc && (
          <button
            onClick={state.playing ? controls.pause : controls.play}
            className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white focus:outline-none"
          >
            {state.playing ? 'Pause' : 'Play'}
          </button>
        )}
        {audioBlob && (
          <button
            onClick={sendAudioToBackend}
            disabled={isSending}
            className="px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white focus:outline-none disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send to Backend'}
          </button>
        )}
      </div>
      {audio}
      {audioSrc && (
        <a
          href={audioSrc}
          download="recorded_audio.wav"
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Download Recording
        </a>
      )}
    </div>
  );
};

export default AudioRecorder;