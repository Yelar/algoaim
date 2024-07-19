// components/RecordingIndicator.tsx
import React from 'react';

interface RecordingIndicatorProps {
  isRecording: boolean;
}

const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({ isRecording }) => {
  return (
    <div className="flex justify-center items-center h-full">
      {isRecording ? (
        <div className="text-red-600">
          <p>Recording...</p>
        </div>
      ) : (
        <div className="text-green-600">
          <p>Not Recording</p>
        </div>
      )}
    </div>
  );
};

export default RecordingIndicator;