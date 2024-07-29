'use client'
import OrbitingCircles from '@/components/magicui/orbiting-circles';
import { FaGoogle } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { FaAmazon } from "react-icons/fa";
import { Icon } from 'lucide-react';
import { FaApple } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useFavicon } from 'react-use';
import { ClassNameValue } from 'tailwind-merge';
import Landing from './components/Landing';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)

interface TimelineItemProps {
  time: string;
  description: string;
}

const TimelineItemContent: React.FC<TimelineItemProps> = ({ time, description }) => (
  <div className="flex items-center">
    <div>
      <p className="font-bold">{time}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
)
const Home: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Head>
        <title>Land Your Dream Jobs in MAANG</title>
        <meta name="description" content="Prepare for coding interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-[60px] py-[16px]">
        <Logo themeProp={true}/>
      </header>

      <main className="flex-grow px-[60px] py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Land Your Dream Job in <span className="text-indigo-400">MAANG</span>
        </h1>
        <p className="text-[24] mb-6 opacity-70">Prepare for coding interviews</p>
        <Link href="/dashboard">
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          Start A Mock Interview →
        </Button>
        </Link>
        
      </div>
      <div className="md:w-1/2 flex justify-center">
        <OrbitingCirclesDemo />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon="&lt;&gt;"
            title="Get interactive real-time mock interviews"
            description="Our AI interviewer uses voice and a code editor to simulate real interview conditions."
          />
          <FeatureCard
            icon="💡"
            title="Practice on real problems"
            description="Our questions are sourced from Leetcode, ensuring they are always up-to-date."
          />
          <FeatureCard
            icon="⚡"
            title="Get instant scoring and feedback"
            description="After you complete your interview, our AI evaluates your performance and provides detailed feedback."
          />
        </div>
        <div className="flex flex-col items-center mt-10">
  <h2 className="text-2xl font-bold mb-6">What you can expect</h2>
  <Timeline className="w-full max-w-md">
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineItemContent time="2 minutes" description="Choosing a company and difficulty of problem" />
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineItemContent time="30 minutes" description="Mock interview" />
        <br/>
        <br/>
        <br/>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector/>
      </TimelineSeparator>
      <TimelineContent>
        <TimelineItemContent time="10 minutes" description="Detailed feedback & problem solution" />
        <br/>
      </TimelineContent>
    </TimelineItem>
    
  </Timeline>
</div>
        {/* <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex jus">What you can expect</h2>
          <div className="space-y-4">
            <TimelineItem time="2 minutes" description="Choosing a company and difficulty of problem" />
            <TimelineItem time="30 minutes" description="Mock interview" />
            <TimelineItem time="10 minutes" description="Detailed feedback & problem solution" />
          </div>
        </div> */}
<br/>
<br/>
<br/>
        <div className="text-center">
          <Link href={"/dashboard"}>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              Start Preparing Now
            </button>
          </Link>
          
        </div>
      </main>
<br/>
<br/>
<br/>
      <footer className="w-full px-[60px] py-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 Yelarys Yertaiuly</p>
          <p>Contact: algoaimai@gmail.com</p>
          <p>inst: algoaim.ai</p>
        </div>
      </footer>
    </div>
  )
  // return (<>
  //   <Dashboard/>
  // </>);
}



export function Logo({themeProp} : any ) {
  let theme : string = (themeProp === true?"#fff":"#000");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="218"
      height="37"
      fill="none"
      viewBox="0 0 218 37"
    >
      <path
        fill={theme}
        d="M55.133 30.366v-3.579l-.093-.586v-5.984c0-1.378-.39-2.437-1.172-3.177-.761-.74-1.902-1.11-3.424-1.11a8.562 8.562 0 00-2.992.523c-.946.35-1.748.813-2.407 1.389l-.987-1.635c.823-.7 1.81-1.234 2.962-1.604a11.253 11.253 0 013.64-.586c2.097 0 3.712.524 4.843 1.573 1.151 1.028 1.727 2.601 1.727 4.72v10.056h-2.097zm-5.584.154c-1.213 0-2.272-.195-3.177-.586-.884-.412-1.563-.967-2.036-1.666-.473-.72-.71-1.542-.71-2.468 0-.843.196-1.604.587-2.282.41-.7 1.069-1.255 1.974-1.666.925-.432 2.16-.648 3.702-.648h5.583v1.635H49.95c-1.563 0-2.653.277-3.27.833-.596.555-.894 1.244-.894 2.067 0 .925.36 1.665 1.08 2.22.72.556 1.727.834 3.023.834 1.233 0 2.292-.278 3.177-.833.905-.576 1.563-1.399 1.974-2.468l.494 1.511c-.412 1.07-1.131 1.923-2.16 2.56-1.007.638-2.282.957-3.825.957zm13.63-.154V7.476h2.19v22.89h-2.19zm15.194 6.138c-1.48 0-2.9-.216-4.257-.648-1.357-.431-2.457-1.048-3.3-1.85l1.11-1.666c.76.679 1.697 1.213 2.807 1.604 1.131.411 2.324.617 3.578.617 2.057 0 3.568-.483 4.535-1.45.966-.946 1.45-2.427 1.45-4.442v-4.04l.308-2.777-.216-2.776V14.17h2.098v14.22c0 2.797-.689 4.843-2.067 6.14-1.357 1.315-3.373 1.973-6.046 1.973zm-.401-6.755c-1.542 0-2.93-.33-4.164-.987a7.687 7.687 0 01-2.93-2.808c-.7-1.192-1.05-2.56-1.05-4.102 0-1.543.35-2.9 1.05-4.072a7.462 7.462 0 012.93-2.776c1.233-.658 2.622-.987 4.164-.987 1.44 0 2.735.298 3.887.894 1.151.597 2.067 1.48 2.745 2.653.679 1.172 1.018 2.602 1.018 4.288 0 1.686-.34 3.115-1.018 4.288-.678 1.172-1.594 2.066-2.745 2.683-1.152.617-2.447.926-3.887.926zm.216-1.944c1.193 0 2.252-.246 3.177-.74a5.803 5.803 0 002.19-2.098c.535-.904.802-1.943.802-3.115 0-1.172-.267-2.2-.802-3.085a5.576 5.576 0 00-2.19-2.067c-.925-.514-1.984-.77-3.177-.77-1.172 0-2.231.256-3.177.77a5.576 5.576 0 00-2.19 2.067c-.515.884-.772 1.913-.772 3.085s.257 2.21.771 3.115a5.803 5.803 0 002.19 2.098c.947.494 2.006.74 3.178.74zm20.994 2.715c-1.563 0-2.972-.35-4.226-1.049a8.01 8.01 0 01-2.93-2.93c-.72-1.255-1.08-2.684-1.08-4.288 0-1.625.36-3.054 1.08-4.288a7.777 7.777 0 012.93-2.9c1.234-.699 2.642-1.048 4.226-1.048 1.604 0 3.023.35 4.257 1.048a7.496 7.496 0 012.93 2.9c.72 1.234 1.08 2.663 1.08 4.288 0 1.604-.36 3.033-1.08 4.288a7.714 7.714 0 01-2.93 2.93c-1.255.7-2.674 1.049-4.257 1.049zm0-1.944c1.172 0 2.21-.256 3.115-.77a5.672 5.672 0 002.129-2.222c.534-.966.802-2.077.802-3.331 0-1.275-.268-2.386-.802-3.332a5.457 5.457 0 00-2.129-2.19c-.905-.535-1.933-.802-3.084-.802-1.152 0-2.18.267-3.085.802-.905.514-1.625 1.244-2.16 2.19-.534.946-.802 2.057-.802 3.332 0 1.254.268 2.365.803 3.331a5.896 5.896 0 002.159 2.221c.905.515 1.923.771 3.054.771zm22.797 1.79v-3.579l-.093-.586v-5.984c0-1.378-.391-2.437-1.172-3.177-.761-.74-1.902-1.11-3.424-1.11a8.56 8.56 0 00-2.992.523c-.946.35-1.748.813-2.407 1.389l-.987-1.635c.823-.7 1.81-1.234 2.962-1.604a11.25 11.25 0 013.64-.586c2.097 0 3.712.524 4.843 1.573 1.151 1.028 1.727 2.601 1.727 4.72v10.056h-2.097zm-5.584.154c-1.213 0-2.272-.195-3.177-.586-.884-.412-1.563-.967-2.036-1.666-.473-.72-.71-1.542-.71-2.468 0-.843.196-1.604.587-2.282.411-.7 1.069-1.255 1.974-1.666.925-.432 2.159-.648 3.702-.648h5.583v1.635h-5.522c-1.563 0-2.653.277-3.27.833-.596.555-.894 1.244-.894 2.067 0 .925.36 1.665 1.079 2.22.72.556 1.728.834 3.024.834 1.233 0 2.292-.278 3.177-.833.905-.576 1.563-1.399 1.974-2.468l.494 1.511c-.412 1.07-1.131 1.923-2.16 2.56-1.007.638-2.282.957-3.825.957zm13.63-.154V14.17h2.19v16.195h-2.19zm1.11-19.774c-.452 0-.832-.154-1.141-.462a1.517 1.517 0 01-.463-1.11c0-.433.155-.792.463-1.08a1.552 1.552 0 011.141-.463c.453 0 .833.144 1.142.432.308.288.463.648.463 1.08 0 .452-.155.832-.463 1.14-.288.31-.669.463-1.142.463zm27.41 3.425c1.316 0 2.458.257 3.424.77.987.494 1.748 1.255 2.283 2.283.555 1.029.833 2.324.833 3.887v9.409h-2.19v-9.193c0-1.707-.412-2.992-1.234-3.856-.802-.884-1.944-1.326-3.424-1.326-1.111 0-2.077.236-2.9.71-.802.452-1.429 1.12-1.882 2.004-.432.864-.648 1.913-.648 3.147v8.514h-2.19v-9.193c0-1.707-.411-2.992-1.234-3.856-.822-.884-1.974-1.326-3.455-1.326-1.089 0-2.046.236-2.868.71-.823.452-1.46 1.12-1.913 2.004-.432.864-.648 1.913-.648 3.147v8.514h-2.19V14.17h2.098v4.38l-.34-.771a5.73 5.73 0 012.376-2.746c1.11-.678 2.416-1.018 3.917-1.018 1.584 0 2.931.402 4.041 1.204 1.111.781 1.831 1.963 2.16 3.547l-.864-.34c.473-1.315 1.306-2.375 2.499-3.177 1.213-.822 2.663-1.233 4.349-1.233z"
      ></path>
      <path
        fill={theme}
        fillRule="evenodd"
        d="M13.384 13.61a2.416 2.416 0 100-4.833 2.416 2.416 0 000 4.832zm.052-.823a1.542 1.542 0 100-3.085 1.542 1.542 0 000 3.085zM30.45 20.07a2.416 2.416 0 100-4.833 2.416 2.416 0 000 4.833zm.054-.823a1.542 1.542 0 100-3.084 1.542 1.542 0 000 3.084zM41.545 4.833a2.416 2.416 0 100-4.833 2.416 2.416 0 000 4.833zm.05-.823a1.542 1.542 0 100-3.085 1.542 1.542 0 000 3.085zM2.416 30.506a2.416 2.416 0 100-4.832 2.416 2.416 0 000 4.832zm.05-.822a1.542 1.542 0 100-3.085 1.542 1.542 0 000 3.085z"
        clipRule="evenodd"
      ></path>
      <path
        fill={theme}
        d="M41.027 4.15l-1.053-.737-8.77 12.525 1.053.738 8.77-12.525zM12.945 13.012l-1.078-.7-9.068 13.962 1.079.7 9.067-13.962zM28.61 17.68l.44-1.21-13.838-5.036-.44 1.208L28.61 17.68z"
      ></path>
    </svg>
  );
}

export function OrbitingCirclesDemo() {
  return (
    <div className="relative sm:flex h-[500px] w-[500px] flex-col items-center justify-center rounded-lg hidden ">
      

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <FaApple className='w-10 h-10'/>
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <RiNetflixFill className='w-10 h-10'/>

      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        
        <FaGoogle className="w-[90px] h-[90px]"/>
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={130}
        duration={10}
        reverse
      >
        <FaAmazon className='w-11 h-11'/>
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <FaMeta className="w-[90px] h-[90px]"/>
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  gitHub: () => (
    <svg width="100" height="100" viewBox="0 0 438.549 438.549">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  notion: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  google: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  ),
  whatsapp: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
};
export default Home