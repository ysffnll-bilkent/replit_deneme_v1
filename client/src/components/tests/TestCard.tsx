import { Link } from "wouter";
import { motion } from "framer-motion";
import { Test } from "@/data/tests";

interface TestCardProps {
  test: Test;
}

export const TestCard = ({ test }: TestCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={test.image} 
        alt={test.title} 
        className="w-full h-56 object-cover" 
      />
      <div className="p-6">
        <h3 className="font-serif text-2xl font-semibold mb-3">{test.title}</h3>
        <p className="opacity-80 mb-6">
          {test.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-2 h-2 ${test.color} rounded-full mr-2`}></div>
            <span className="text-sm">{test.questions.length} questions</span>
          </div>
          <Link href={`/tests/${test.slug}`}>
            <motion.a 
              className={`px-5 py-2 ${test.buttonColor} text-white rounded-full transition-colors shadow-sm font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Take Test
            </motion.a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
