import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillAssessmentProps {
  skill: string;
  onComplete: (result: { passed: boolean; score: number; level: string }) => void;
}

// Mock questions with different difficulty levels
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the output of console.log(typeof [])?',
    options: ['array', 'object', 'undefined', 'null'],
    correctAnswer: 'object',
    difficulty: 'beginner',
  },
  {
    id: '2',
    text: 'Which method is used to add elements to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    difficulty: 'beginner',
  },
  {
    id: '3',
    text: 'What is the result of 2 + "2"?',
    options: ['4', '22', 'NaN', 'TypeError'],
    correctAnswer: '22',
    difficulty: 'intermediate',
  },
  {
    id: '4',
    text: 'What is a closure in JavaScript?',
    options: [
      'A function that has access to variables in its outer scope',
      'A way to close a browser window',
      'A method to end a loop',
      'A type of error handling',
    ],
    correctAnswer: 'A function that has access to variables in its outer scope',
    difficulty: 'advanced',
  },
  {
    id: '5',
    text: 'What is the time complexity of Array.prototype.sort()?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(n log n)',
    difficulty: 'expert',
  },
];

export function SkillAssessment({ skill, onComplete }: SkillAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    level: string;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const correctAnswers = newAnswers.reduce((acc, curr, idx) => {
        return curr === mockQuestions[idx].correctAnswer ? acc + 1 : acc;
      }, 0);

      const score = (correctAnswers / mockQuestions.length) * 100;
      
      // Determine skill level based on score and question difficulty
      let level = 'beginner';
      if (score >= 90) level = 'expert';
      else if (score >= 80) level = 'advanced';
      else if (score >= 60) level = 'intermediate';

      setResult({
        score,
        level,
        correctAnswers,
        totalQuestions: mockQuestions.length,
      });
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    if (result) {
      onComplete({
        passed: result.score >= 60,
        score: result.score,
        level: result.level,
      });
    }
  };

  if (showResult && result) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-24">
          {result.score >= 60 ? (
            <CheckCircleIcon className="h-24 w-24 text-green-500" />
          ) : (
            <XCircleIcon className="h-24 w-24 text-red-500" />
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            {result.score >= 60 ? 'Assessment Passed!' : 'Assessment Not Passed'}
          </h3>
          <p className="mt-2 text-gray-600">
            You got {result.correctAnswers} out of {result.totalQuestions} questions correct
          </p>
        </div>

        <div className="mx-auto max-w-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Score:</span>
            <span className="text-lg font-bold">{Math.round(result.score)}%</span>
          </div>
          <Progress value={result.score} className="h-3" />
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <p className="font-medium text-blue-900">
            Your skill level: <span className="capitalize">{result.level}</span>
          </p>
          <p className="mt-1 text-sm text-blue-700">
            This assessment shows you have {result.level} proficiency in {skill}
          </p>
        </div>

        <Button onClick={handleComplete} className="w-full">
          Complete Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / mockQuestions.length) * 100)}% complete</span>
        </div>
        <Progress 
          value={((currentQuestion + 1) / mockQuestions.length) * 100} 
          className="h-2"
        />
      </div>

      {/* Question */}
      <div className="rounded-lg border bg-white p-6">
        <p className="mb-4 text-lg">{mockQuestions[currentQuestion].text}</p>
        <div className="space-y-3">
          {mockQuestions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full rounded-lg border p-4 text-left transition-colors hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="text-center text-sm text-gray-600">
        Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
    </div>
  );
}