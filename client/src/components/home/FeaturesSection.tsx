import { Gem, Sparkles, Palette } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Gem className="text-lavender text-2xl" />,
    title: "Crystal Encyclopedia",
    description: "Explore our extensive collection of crystals and gemstones, each with detailed properties and spiritual benefits.",
    color: "bg-lavender/20",
    textColor: "text-lavender"
  },
  {
    icon: <Sparkles className="text-blush text-2xl" />,
    title: "Spiritual Tests",
    description: "Discover your energy type, ideal stones, and personalized spiritual practices through our interactive assessments.",
    color: "bg-blush/30",
    textColor: "text-blush"
  },
  {
    icon: <Palette className="text-sage text-2xl" />,
    title: "Custom Jewelry",
    description: "Design your own crystal jewelry pieces tailored to your personal energy and aesthetic preferences.",
    color: "bg-sage/30",
    textColor: "text-sage"
  }
];

export const FeaturesSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Spiritual Wellness Journey</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Embark on a path of self-discovery through our comprehensive spiritual platform
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="text-center p-6 rounded-xl bg-sand/50 flex flex-col items-center"
              variants={itemVariants}
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
