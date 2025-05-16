import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import { tests, TestResult } from "@/data/tests";
import { getCrystalBySlug, Crystal } from "@/data/crystals";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";

interface StoredTestResult {
  testId: string;
  testName: string;
  resultScore: string;
  answers: Record<string, string>;
}

export default function TestResults() {
  const [, setLocation] = useLocation();
  const [testResult, setTestResult] = useState<StoredTestResult | null>(null);
  const [result, setResult] = useState<TestResult | null>(null);
  const [test, setTest] = useState<any>(null);
  const [recommendedCrystal, setRecommendedCrystal] = useState<Crystal | null>(null);
  const { favorites, toggleFavorite } = useFavorites();
  
  useEffect(() => {
    // Get test result from session storage
    const storedResult = sessionStorage.getItem('testResult');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult) as StoredTestResult;
        setTestResult(parsedResult);
        
        // Find the test
        const testData = tests.find(t => t.id === parsedResult.testId);
        
        if (testData) {
          setTest(testData);
          
          // Find the result
          const resultData = testData.results.find(r => r.id === parsedResult.resultScore);
          
          if (resultData) {
            setResult(resultData);
            
            // Find the recommended crystal
            const crystal = getCrystalBySlug(resultData.crystalRecommendation);
            
            if (crystal) {
              setRecommendedCrystal(crystal);
            }
          }
        }
      } catch (error) {
        console.error('Failed to parse test result:', error);
      }
    } else {
      // If no result is found, redirect to tests page
      setLocation('/tests');
    }
    
    // Save result to localStorage for profile page
    const savedResults = localStorage.getItem('testResults');
    let testResultsHistory = savedResults ? JSON.parse(savedResults) : [];
    
    // Add current result if it exists
    if (storedResult) {
      const currentResult = JSON.parse(storedResult);
      currentResult.date = new Date().toISOString();
      testResultsHistory = [currentResult, ...testResultsHistory];
      localStorage.setItem('testResults', JSON.stringify(testResultsHistory.slice(0, 10))); // Keep last 10 results
    }
  }, [setLocation]);

  if (!testResult || !result || !test || !recommendedCrystal) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse w-16 h-16 rounded-full bg-lavender/50"></div>
      </div>
    );
  }

  const isCrystalFavorite = favorites.includes(recommendedCrystal.slug);

  const handleFavoriteToggle = () => {
    toggleFavorite(recommendedCrystal.slug);
  };

  return (
    <>
      <Helmet>
        <title>Your {test.title} Results | Crystal Essence</title>
        <meta 
          name="description" 
          content={`View your personalized results from the ${test.title}. Discover your energy type and crystal recommendations.`}
        />
        <meta property="og:title" content={`Your ${test.title} Results | Crystal Essence`} />
        <meta property="og:description" content="View your personalized spiritual test results and crystal recommendations." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 bg-lavender/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Navigation */}
            <div className="mb-8">
              <Link href="/tests">
                <a className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors">
                  <ArrowLeft size={18} className="mr-2" />
                  <span>Back to Tests</span>
                </a>
              </Link>
            </div>
            
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="bg-lavender/20 p-6 md:p-8 text-center">
                <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">Your Results</h1>
                <p className="text-lg opacity-80">{test.title}</p>
              </div>
              
              {/* Result Content */}
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="mb-8 text-center">
                    <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3 text-lavender">
                      {result.title}
                    </h2>
                    <p className="text-lg opacity-80">{result.description}</p>
                  </div>
                  
                  {/* Recommended Crystal */}
                  <div className="border-t border-b border-softgray py-8 my-8">
                    <h3 className="font-serif text-xl font-semibold mb-6 text-center">
                      Your Recommended Crystal
                    </h3>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-1/3">
                        <Link href={`/encyclopedia/${recommendedCrystal.slug}`}>
                          <a className="block">
                            <img 
                              src={recommendedCrystal.image}
                              alt={recommendedCrystal.name}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          </a>
                        </Link>
                      </div>
                      
                      <div className="w-full md:w-2/3">
                        <Link href={`/encyclopedia/${recommendedCrystal.slug}`}>
                          <a className="block">
                            <h4 className="font-serif text-xl font-semibold mb-2">
                              {recommendedCrystal.name}
                            </h4>
                          </a>
                        </Link>
                        <p className="italic text-lg mb-4">{recommendedCrystal.shortDescription}</p>
                        <p className="opacity-80 mb-4">
                          This crystal is particularly aligned with your energy based on your responses.
                        </p>
                        
                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={handleFavoriteToggle}
                            variant="outline"
                            className={`border-2 ${
                              isCrystalFavorite 
                                ? "border-blush bg-blush/10 text-blush" 
                                : "border-lavender text-lavender hover:bg-lavender/10"
                            } rounded-full px-4 py-2 flex items-center gap-2`}
                          >
                            <Heart className={isCrystalFavorite ? "fill-current" : ""} size={16} />
                            <span>{isCrystalFavorite ? "Saved" : "Save Crystal"}</span>
                          </Button>
                          
                          <Link href={`/encyclopedia/${recommendedCrystal.slug}`}>
                            <Button
                              variant="default"
                              className="bg-lavender hover:bg-lavender/90 text-white rounded-full px-4 py-2"
                            >
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/tests">
                      <Button
                        variant="outline"
                        className="border-2 border-lavender text-lavender hover:bg-lavender/10 rounded-full px-6 py-3"
                      >
                        Take Another Test
                      </Button>
                    </Link>
                    
                    <Link href="/profile">
                      <Button
                        variant="default"
                        className="bg-lavender hover:bg-lavender/90 text-white rounded-full px-6 py-3"
                      >
                        View Your Profile
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
