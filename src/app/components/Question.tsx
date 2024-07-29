'use client'
// components/Question.tsx
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"
import {TableRow, TableCell } from "@/components/ui/table"

interface QuestionProps {
  title_slug: string;
  question_title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const Question: React.FC<QuestionProps> = ({ title_slug, question_title, difficulty }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link href={`/dashboard/problems/${title_slug}`} passHref className="block hover:text-blue-500">
          {question_title}
        </Link>
      </TableCell>
      <TableCell>
        <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
      </TableCell>
    </TableRow>
  );
};

export default Question;