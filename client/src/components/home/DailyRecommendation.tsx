import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export const DailyRecommendation = () => {
  return (
    <section className="py-16 bg-blush/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
              alt="Amethyst crystal" 
              className="rounded-xl shadow-lg w-full h-auto" 
            />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blush/20 text-blush font-medium text-sm mb-4">
              Daily Crystal
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Amethyst</h2>
            <p className="text-lg mb-6 opacity-80">
              Today's featured crystal is known for its calming energy. Amethyst helps clear the mind of negative thoughts, relieves stress, and balances emotions.
            </p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-lavender mt-1 mr-3 flex-shrink-0" size={20} />
                <span>Enhances intuition and spiritual awareness</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-lavender mt-1 mr-3 flex-shrink-0" size={20} />
                <span>Alleviates insomnia and promotes restful sleep</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-lavender mt-1 mr-3 flex-shrink-0" size={20} />
                <span>Dispels negative energy and provides protection</span>
              </li>
            </ul>
            <Link href="/encyclopedia/amethyst">
              <motion.a 
                className="inline-flex items-center px-6 py-3 border-2 border-lavender text-lavender hover:bg-lavender hover:text-white rounded-full transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Learn More</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
