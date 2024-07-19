'use client'
// pages/contact.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AnalysisResponse {
  positive: string[];
  negative: string[];
  suggestions: string;
  chanceOfGettingJob: number;
}

const Evaluation = () => {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    // console.log(messages);
    axios.post('http://localhost:3002/api/v1/analyse', { chat : messages, currentStage: 5})
      .then(response => {
        setAnalysis(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100 p-4">
      {loading && <p className="text-xl">Loading...</p>}
      {error && <p className="text-xl text-red-500">{error}</p>}
      {analysis && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Analysis Result</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Positive Feedback</h2>
            <ul className="list-disc list-inside">
              {analysis.positive.map((item, index) => (
                <li key={index} className="ml-4">{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Negative Feedback</h2>
            <ul className="list-disc list-inside">
              {analysis.negative.map((item, index) => (
                <li key={index} className="ml-4">{item}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Suggestions</h2>
            <p className="ml-4">{analysis.suggestions}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Chance of Getting Job</h2>
            <p className="ml-4">{analysis.chanceOfGettingJob}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;