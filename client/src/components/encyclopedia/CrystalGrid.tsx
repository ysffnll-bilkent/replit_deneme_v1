import { CrystalCard } from "./CrystalCard";
import { Crystal } from "@/data/crystals";
import { motion } from "framer-motion";

interface CrystalGridProps {
  crystals: Crystal[];
  showAll?: boolean;
}

export const CrystalGrid = ({ crystals, showAll = true }: CrystalGridProps) => {
  // If showAll is false, display only the first 8 crystals
  const displayCrystals = showAll ? crystals : crystals.slice(0, 8);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {displayCrystals.map((crystal) => (
        <motion.div key={crystal.slug} variants={item}>
          <CrystalCard crystal={crystal} />
        </motion.div>
      ))}
    </motion.div>
  );
};
