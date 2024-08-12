'use client'
// pages/contact.tsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Editor } from '@monaco-editor/react';
import Link from 'next/link';
import { Logo } from '@/app/page'

interface AnalysisResponse {
  positive: string[];
  negative: string[];
  suggestions: string;
  chanceOfGettingJob: number;
}
interface RuntimeMemoryProps {
  runtime: number;
  runtimePercentage: number;
  memory: number;
  memoryPercentage: number;
}
const Evaluation = ({params} : any) => {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isErr, setIsErr] = useState<boolean>(true);
  const [finalCode, setFinalCode] = useState("");
  const [finalLang, setFinalLang] = useState("cpp")
  const [codeErr, setCodeErr] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const code = JSON.parse(localStorage.getItem('code') || '{}');
        const title = params.title_slug;
        try {
          const question = await axios.get(`https://iphone-scrapping-production.up.railway.app/api/v1/${title}/questionInfo`);
          // console.log(question.data);
          const questionId = question.data.questionId;
          // console.log("sadad", questionId);
          const response = await axios.post('https://iphone-scrapping-production.up.railway.app/api/v1/analyse', { chat: messages, code: code, currentStage: 5 })
          setAnalysis(response.data);
          setLoading(false);
          setIsErr(true);
          const lang = code.lang || "cpp";
          const codee = code.code || "  ";
          setFinalCode(codee);
          setFinalLang(lang);
          
        } catch(error) {
          setLoading(false);
          console.error(error);
        }
        
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [params.title_slug]);


  return (
    <div className="text-white flex flex-col w-full h-screen items-center justify-center bg-gray-900 p-4">
      {loading && 
<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
}
      {error && <p className="text-xl text-red-500">{error}</p>}
      {analysis && (<div className="w-full max-w-2xl bg-gray-700 p-6 rounded-lg shadow-md overflow-auto">
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={false}>
            <Logo themeProp={true}/>
            
          </Link>
        <h1 className="py-4 text-2xl font-bold mb-4">Interview Result</h1><div className="flex flex-col md:flex-row gap-4">
  

    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">POSITIVES</h2>
      {analysis.positive.map((item, index) => (
        <FeedbackItem key={index} isPositive={true} text={item} />
      ))}
    </div>
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">NEGATIVES</h2>
      {analysis.negative.map((item, index) => (
        <FeedbackItem key={index} isPositive={false} text={item} />
      ))}
    </div>
  </div>
  <div className="mb-4">
    <h2 className="text-xl font-semibold">Suggestions</h2>
    <p className="ml-4">{analysis.suggestions}</p>
  </div>


</div>
        
        
      )}
    </div>
  );
};

// const ErrorMessage = ({ content, code, lang }:any) => {
//   return (
//     <div className="relative rounded-lg px-4 py-3 bg-[rgba(246,54,54,0.08)] dark:bg-[rgba(248,97,92,0.08)]">
//       <div className="z-base-1 hidden rounded border group-hover:block border-border-quaternary dark:border-border-quaternary bg-layer-02 dark:bg-layer-02 absolute right-2.5 top-2.5">
//         <div className="relative cursor-pointer flex h-[22px] w-[22px] items-center justify-center bg-layer-02 dark:bg-layer-02 hover:bg-fill-tertiary dark:hover:bg-fill-tertiary rounded-[4px]" data-state="closed">
//           <div>
//             <div data-state="closed">
//               <div className="relative text-[12px] leading-[normal] p-[1px] before:block before:h-3 before:w-3 h-3.5 w-3.5 text-text-primary dark:text-text-primary">
//                 <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clone" className="svg-inline--fa fa-clone absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                   <path fill="currentColor" d="M64 464H288c8.8 0 16-7.2 16-16V384h48v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h64v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM224 304H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H224c-8.8 0-16 7.2-16 16V288c0 8.8 7.2 16 16 16zm-64-16V64c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64z"></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="overflow-wrap:break-word">
//         <div className="align-middle">
//           <div className="font-menlo whitespace-pre-wrap text-[13px] leading-[21px] overflow-y-auto text-red-60 dark:text-red-60">
//             {content}
//           </div>
//         </div>
//       </div>
//       <Editor
//       height="50vh"
//       width={`100%`}
//       language={lang}
//       value={code}
//       theme={"vs-dark"}
//       defaultValue="// some comment"
//       options={{
//         readOnly: true,
//         minimap: { enabled: false },
//         scrollBeyondLastLine: false,
//       }}
//     />
//     </div>
//   );
// };


// const RuntimeMemory: React.FC<RuntimeMemoryProps> = ({ runtime, runtimePercentage, memory, memoryPercentage }) => {

//   return (
//     <>
//       <div className="bg-gray-800 p-6 rounded-lg rounded-sd group flex min-w-[275px] flex-1 cursor-pointer flex-col px-4 py-3 text-xs transition hover:opacity-100 bg-sd-accent">
//         <div className="flex justify-between gap-2">
//           <div className="text-sd-foreground flex items-center gap-1">
//             <div className="relative text-[12px] leading-[normal] before:block before:h-3 before:w-3">
//               <ClockIcon className="h-[24px] w-[24px]" />
//             </div>
//             <div className="flex-1 text-sm text-white">Runtime</div>
//           </div>
//         </div>
//         <div className="mt-2 flex items-center gap-1 text-white">
//           <span className="text-sd-foreground text-lg font-semibold">{runtime}</span>
//           <span className="text-sd-muted-foreground text-sm">ms</span>
//           <div className="bg-divider-2 dark:bg-dark-divider-2 w-px border-sd-border mx-1 h-3"></div>
//           <span className="text-sd-muted-foreground capitalize">Beats</span>
//           <span className="text-sd-foreground text-lg font-semibold">{runtimePercentage}%</span>
//         </div>
//       </div>
//       <br />
//       <div className="bg-gray-800 p-6 rounded-lg rounded-sd group flex min-w-[275px] flex-1 cursor-pointer flex-col px-4 py-3 text-xs transition hover:opacity-100 bg-sd-accent">
//         <div className="flex justify-between gap-2">
//           <div className="text-sd-foreground flex items-center gap-1">
//             <div className="relative text-[12px] leading-[normal] before:block before:h-3 before:w-3">
//               <MemoryIcon className="" />
//             </div>
//             <div className="flex-1 text-sm text-white">Memory</div>
//           </div>
//         </div>
//         <div className="mt-2 flex items-center gap-1 text-white">
//           <span className="text-sd-foreground text-lg font-semibold">{memory}</span>
//           <span className="text-sd-muted-foreground text-sm">MB</span>
//           <div className="bg-divider-2 dark:bg-dark-divider-2 w-px border-sd-border mx-1 h-3"></div>
//           <span className="text-sd-muted-foreground capitalize">Beats</span>
//           <span className="text-sd-foreground text-lg font-semibold">{memoryPercentage}%</span>
//         </div>
//       </div>
//     </>
//   );
// };


// function ClockIcon({cs} : any) {
//   return(
//     <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" className=" w-3 h-3 svg-inline--fa fa-clock absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>
//   );
// }
// function MemoryIcon({cs} : any) {
//   return(
// <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="microchip" className=" w-3 h-3 svg-inline--fa fa-microchip absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M184 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64h-8c-35.3 0-64 28.7-64 64v8H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v48H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v48H24c-13.3 0-24 10.7-24 24s10.7 24 24 24H64v8c0 35.3 28.7 64 64 64h8v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h48v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h48v40c0 13.3 10.7 24 24 24s24-10.7 24-24V448h8c35.3 0 64-28.7 64-64v-8h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V280h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448V184h40c13.3 0 24-10.7 24-24s-10.7-24-24-24H448v-8c0-35.3-28.7-64-64-64h-8V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H280V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H184V24zM400 128V384c0 8.8-7.2 16-16 16H128c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H384c8.8 0 16 7.2 16 16zM192 160c-17.7 0-32 14.3-32 32V320c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H192zm16 48h96v96H208V208z"></path></svg>
//   );
// }

const FeedbackItem = ({ text, isPositive } : any) => (
  <div className="flex items-center mb-4">
    <span className={`mr-3 text-2xl ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '+' : '-'}
    </span>
    <p className="text-sm">{text}</p>
  </div>
);

const FeedbackSection = () => (
  <div className="flex justify-between">
    <div className="w-[48%]">
      <h2 className="text-xl font-bold mb-4">POSITIVES</h2>
      <FeedbackItem 
        isPositive={true}
        text="You were able to quickly understand the problem and propose a solution using the arithmetic sum formula." 
      />
      <FeedbackItem 
        isPositive={true}
        text="You demonstrated a good understanding of Python syntax and used appropriate data structures and algorithms for the problem." 
      />
      <FeedbackItem 
        isPositive={true}
        text="You tested your code with a range of inputs, including edge cases, and were able to identify and fix any bugs independently." 
      />
    </div>
    <div className="w-[48%]">
      <h2 className="text-xl font-bold mb-4">NEGATIVES</h2>
      <FeedbackItem 
        isPositive={false}
        text="You initially implemented the arithmetic sum formula incorrectly and needed guidance from the interviewer to correct it." 
      />
      <FeedbackItem 
        isPositive={false}
        text="There were moments where you seemed unsure or confused, particularly when discussing edge cases and potential issues with your code." 
      />
      <FeedbackItem 
        isPositive={false}
        text="You initially overlooked the edge case where the missing number is 'n' and did not initially consider the scenario where the input list is empty." 
      />
    </div>
  </div>
);
export default Evaluation;