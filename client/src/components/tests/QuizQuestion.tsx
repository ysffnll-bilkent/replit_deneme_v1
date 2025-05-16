import { motion } from "framer-motion";
import { TestQuestion, TestAnswer } from "@/data/tests";

interface QuizQuestionProps {
  question: TestQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answerId: string) => void;
  currentStep: number;
  totalSteps: number;
}

export const QuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer,
  currentStep,
  totalSteps
}: QuizQuestionProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Bar */}
      <div className="w-full bg-softgray h-2 rounded-full mb-8">
        <div 
          className="bg-lavender h-2 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h4 className="text-xl font-medium mb-6">{question.text}</h4>
        
        <div className="space-y-4">
          {question.answers.map((answer: TestAnswer) => (
            <label 
              key={answer.id}
              className={`block p-4 border-2 ${
                selectedAnswer === answer.id 
                  ? 'border-lavender bg-lavender/5' 
                  : 'border-softgray hover:bg-lavender/5 hover:border-lavender/30'
              } rounded-lg cursor-pointer transition-colors`}
            >
              <div className="flex items-start">
                <input 
                  type="radio" 
                  name="question" 
                  className="mt-1 text-lavender focus:ring-lavender"
                  checked={selectedAnswer === answer.id}
                  onChange={() => onSelectAnswer(answer.id)}
                />
                <div className="ml-3">
                  <span className="block font-medium">{answer.text}</span>
                  <span className="block text-sm opacity-70 mt-1">{answer.description}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
