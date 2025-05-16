import { motion, AnimatePresence } from "framer-motion";

interface CustomizerPreviewProps {
  selectedItemType: string;
  selectedCrystal: string;
  selectedMaterial: string;
  selectedLength: string;
}

export const CustomizerPreview = ({
  selectedItemType,
  selectedCrystal,
  selectedMaterial,
  selectedLength
}: CustomizerPreviewProps) => {
  // This would be replaced with actual preview images based on selections
  // For this demo, we'll use a placeholder

  // Map selections to display names for the title
  const crystalDisplayNames: Record<string, string> = {
    "amethyst": "Amethyst",
    "rose-quartz": "Rose Quartz",
    "clear-quartz": "Clear Quartz",
    "turquoise": "Turquoise"
  };
  
  const materialDisplayNames: Record<string, string> = {
    "silver": "Silver",
    "gold": "Gold",
    "rose-gold": "Rose Gold"
  };

  const imageMap: Record<string, string> = {
    "necklace-amethyst": "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-rose-quartz": "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-clear-quartz": "https://images.unsplash.com/photo-1551406483-3a3a34580d3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "necklace-turquoise": "https://images.unsplash.com/photo-1583252307967-7a3591c1a9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-amethyst": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-rose-quartz": "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-clear-quartz": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "bracelet-turquoise": "https://images.unsplash.com/photo-1611557245338-153b70f1ec7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-amethyst": "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-rose-quartz": "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-clear-quartz": "https://images.unsplash.com/photo-1631150343075-d8dc28f031dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
    "earrings-turquoise": "https://images.unsplash.com/photo-1624526267942-d7eaa752605a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
  };

  const previewImage = imageMap[`${selectedItemType}-${selectedCrystal}`] || "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600";
  const title = `${crystalDisplayNames[selectedCrystal] || 'Crystal'} ${selectedItemType.charAt(0).toUpperCase() + selectedItemType.slice(1)}`;
  const subtitle = `${materialDisplayNames[selectedMaterial] || 'Metal'} | ${selectedLength}"`;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 aspect-square flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img 
            key={previewImage}
            src={previewImage} 
            alt={title} 
            className="max-w-full max-h-full object-contain" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>
      <div className="text-center">
        <h3 className="font-serif text-2xl font-semibold mb-2">{title}</h3>
        <p className="opacity-70">{subtitle}</p>
      </div>
    </div>
  );
};
