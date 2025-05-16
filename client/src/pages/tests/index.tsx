import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TestCard } from "@/components/tests/TestCard";
import { tests } from "@/data/tests";

export default function TestsList() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Spiritual Tests | Crystal Essence</title>
        <meta 
          name="description" 
          content="Discover your spiritual energy, ideal crystals, and personalized insights through our interactive assessments."
        />
        <meta property="og:title" content="Spiritual Tests | Crystal Essence" />
        <meta property="og:description" content="Take our spiritual tests to discover your energy type, ideal crystals, and personalized insights." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-lavender/10">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Discover"
            badgeColor="bg-blush/20 text-blush"
            title="Spiritual Tests"
            description="Gain insight into your spiritual journey with our personalized assessments"
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tests.map((test) => (
              <motion.div key={test.id} variants={itemVariants}>
                <TestCard test={test} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Test Information */}
          <div className="mt-16 bg-white rounded-xl shadow-md p-6 md:p-8">
            <h3 className="font-serif text-2xl font-semibold mb-6 text-center">About Our Spiritual Tests</h3>
            
            <div className="max-w-3xl mx-auto prose">
              <p>
                Our spiritual tests are designed to help you gain deeper insights into your energy, 
                personality, and spiritual needs. Each assessment is carefully crafted to provide 
                personalized guidance on your spiritual journey.
              </p>
              
              <p>
                These tests are based on spiritual traditions, crystal healing principles, and 
                energy work fundamentals. While they're meant to be insightful and fun, remember that 
                your intuition is always your best guide.
              </p>
              
              <h4>How to Get the Most from Your Tests:</h4>
              
              <ul>
                <li>Take the test in a quiet, relaxed environment without distractions</li>
                <li>Answer questions based on your first instinct rather than overthinking</li>
                <li>Be honest with yourself - there are no "right" or "wrong" answers</li>
                <li>Consider your results as guidance rather than absolute truth</li>
                <li>Use your test results to explore new crystals and spiritual practices</li>
              </ul>
              
              <p>
                After completing a test, you'll receive personalized insights and crystal recommendations 
                that resonate with your energy. You can save your results in your profile for future 
                reference and to track your spiritual growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
