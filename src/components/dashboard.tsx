'use client'

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import Question from "@/app/components/Question"
interface IQuestion {
  title: string;
  title_slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const Dashboard: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    axios.get('http://iphone-scrapping.onrender.com/api/v1/all/problems')
      .then(response => {
        const data = response.data.map((item: any) => ({
          title: item.title,
          title_slug: item.titleSlug,
          difficulty: item.difficulty,
        }));
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className="flex min-h-screen flex-auto">
    {/* <aside className="w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <span className="text-xl font-semibold">algoaim</span>
      </div>
      <nav className="p-4 space-y-2">
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <ViewIcon className="w-5 h-5" />
          <span>Overview</span>
        </a>
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <FilesIcon className="w-5 h-5" />
            <span>Pages</span>
            <ChevronDownIcon className="w-4 h-4 ml-auto" />
          </a>
          <div className="pl-6 space-y-1">
            <a href="#" className="block text-gray-400 hover:text-white">
              Product List
            </a>
            <a href="#" className="block text-gray-400 hover:text-white">
              Billing
            </a>
            <a href="#" className="block text-gray-400 hover:text-white">
              Invoice
            </a>
          </div>
        </div>
        <a href="#" className="flex items-center space-x-2 text-white bg-gray-800 rounded-md">
          <StoreIcon className="w-5 h-5" />
          <span>Sales</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
          <MessagesSquareIcon className="w-5 h-5" />
          <span>Messages</span>
          <Badge variant="secondary" className="ml-auto">
            1
          </Badge>
        </a>
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <LogInIcon className="w-5 h-5" />
            <span>Authentication</span>
            <ChevronDownIcon className="w-4 h-4 ml-auto" />
          </a>
          <div className="pl-6 space-y-1">
            <a href="#" className="block text-gray-400 hover:text-white">
              Docs
            </a>
            <a href="#" className="block text-gray-400 hover:text-white">
              Components
            </a>
            <a href="#" className="block text-gray-400 hover:text-white">
              Help
            </a>
          </div>
        </div>
      </nav>
    </aside> */}
    <main className="flex-1 bg-gray-900 p-8">
    <div className="flex justify-center mb-8 gap-2 text-white text-2xl font-bold">
        Choose a problem to start a Mock
      </div>
      {/* <div className="flex justify-center mb-8 gap-2">
        <Input
          type="search"
          placeholder="Quick search for anything"
          className="w-full max-w-lg px-4 py-2 bg-gray-800 text-gray-400 rounded-md"
        />
        <Button variant="outline" className="shrink-0">
          Search
        </Button>
      </div> */}
      <Card className="bg-gray-800 text-white w-50 md:w-1/2 mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">PROBLEM NAME</TableHead>
              <TableHead className="text-gray-400">DIFFICULTY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {questions.map((item) => (
            <Question
              key={item.title_slug}
              title_slug={item.title_slug}
              question_title={item.title}
              difficulty={item.difficulty}
            />
          ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  </div>
  )
}

function ChevronDownIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FilesIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
      <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
      <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
    </svg>
  )
}


function LogInIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function MessagesSquareIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </svg>
  )
}


function StoreIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}


function ViewIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
