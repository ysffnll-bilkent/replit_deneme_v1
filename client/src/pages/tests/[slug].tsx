import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QuizQuestion } from "@/components/tests/QuizQuestion";
import { getTestBySlug, Test, TestQuestion } from "@/data/tests";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";

export default function TestFlow() {
  const [, params] = useRoute("/tests/:slug");
  const [, setLocation] = useLocation();
  const [test, setTest] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const slug = params?.slug || "";

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Get test data
    const testData = getTestBySlug(slug);
    
    if (testData) {
      setTest(testData);
      // Initialize answers with empty object
      const initialAnswers: Record<string, string> = {};
      testData.questions.forEach(question => {
        initialAnswers[question.id] = "";
      });
      setAnswers(initialAnswers);
    }
    
    setIsLoading(false);
  }, [slug]);

  useEffect(() => {
    // Reset selected answer when question changes
    if (test) {
      const currentQuestionId = test.questions[currentQuestionIndex].id;
      setSelectedAnswer(answers[currentQuestionId] || null);
    }
  }, [currentQuestionIndex, test, answers]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse w-16 h-16 rounded-full bg-lavender/50"></div>
      </div>
    );
  }

  if (!test) {
    return <NotFound />;
  }

  const currentQuestion: TestQuestion = test.questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    setAnswers({
      ...answers,
      [currentQuestion.id]: answerId
    });
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate result
      calculateResult();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const calculateResult = () => {
    // Count the answer scores
    const scores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([questionId, answerId]) => {
      // Find the question
      const question = test.questions.find(q => q.id === questionId);
      if (!question) return;
      
      // Find the answer
      const answer = question.answers.find(a => a.id === answerId);
      if (!answer) return;
      
      // Count the score
      const score = answer.score;
      scores[score] = (scores[score] || 0) + 1;
    });
    
    // Find the highest score
    let highestScore = "";
    let highestCount = 0;
    
    Object.entries(scores).forEach(([score, count]) => {
      if (count > highestCount) {
        highestScore = score;
        highestCount = count;
      }
    });
    
    // Save the result to session storage
    sessionStorage.setItem('testResult', JSON.stringify({
      testId: test.id,
      testName: test.title,
      resultScore: highestScore,
      answers: answers
    }));
    
    // Redirect to results page
    setLocation('/tests/results');
  };

  return (
    <>
      <Helmet>
        <title>{test.title} | Crystal Essence</title>
        <meta 
          name="description" 
          content={`Take the ${test.title} to discover insights about your spiritual energy and receive personalized crystal recommendations.`}
        />
        <meta property="og:title" content={`${test.title} | Crystal Essence`} />
        <meta property="og:description" content={test.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 bg-lavender/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-center">{test.title}</h1>
            <p className="text-lg text-center mb-12 opacity-80">{test.description}</p>
            
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <AnimatePresence mode="wait">
                <QuizQuestion
                  key={currentQuestion.id}
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onSelectAnswer={handleSelectAnswer}
                  currentStep={currentQuestionIndex + 1}
                  totalSteps={test.questions.length}
                />
              </AnimatePresence>
              
              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={isFirstQuestion}
                  variant="outline"
                  className="px-5 py-2 border border-softgray text-charcoal/70 rounded-full hover:bg-softgray/50 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="px-5 py-2 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLastQuestion ? "See Results" : "Next"}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
