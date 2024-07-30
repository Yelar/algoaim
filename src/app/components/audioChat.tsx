// components/RecordingIndicator.tsx
import React from 'react';

interface RecordingIndicatorProps {
  isRecording: boolean;
}

const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({ isRecording }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`
        relative w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center overflow-hidden
        ${isRecording ? 'animate-pulse' : ''}
      `}>
        {isRecording && (
          <>
            <div className="absolute w-full h-full bg-blue-300 rounded-full opacity-0 animate-wave"></div>
            <div className="absolute w-full h-full bg-blue-300 rounded-full opacity-0 animate-wave [animation-delay:300ms]"></div>
            <div className="absolute w-full h-full bg-blue-300 rounded-full opacity-0 animate-wave [animation-delay:600ms]"></div>
            
          </>
          
        )}
      </div>
    </div>
  );
};

export default RecordingIndicator;