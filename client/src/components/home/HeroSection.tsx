import { motion } from "framer-motion";
import { Link } from "wouter";

export const HeroSection = () => {
  return (
    <section className="relative bg-lavender/10 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517638851339-a711cfcf3279?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
      />
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover Your Spiritual Connection
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Explore our curated collection of crystals, personalized insights, and handcrafted jewelry to enhance your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/encyclopedia">
              <motion.div 
                className="px-8 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium inline-block cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Crystals
              </motion.div>
            </Link>
            <Link href="/tests">
              <motion.div 
                className="px-8 py-3 border-2 border-lavender text-lavender hover:bg-lavender hover:text-white rounded-full transition-colors font-medium inline-block cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take a Test
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
