import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader = ({ 
  badge, 
  badgeColor = "bg-lavender/20 text-lavender", 
  title, 
  description,
  centered = true
}: SectionHeaderProps) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <motion.div 
          className={`inline-block px-4 py-1 rounded-full ${badgeColor} font-medium text-sm mb-4`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {badge}
        </motion.div>
      )}
      <motion.h2 
        className="font-serif text-3xl md:text-4xl font-semibold mb-4"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          className={`text-lg opacity-80 ${centered ? 'max-w-2xl mx-auto' : ''}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
