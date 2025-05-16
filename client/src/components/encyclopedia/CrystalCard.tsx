import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Crystal } from "@/data/crystals";

interface CrystalCardProps {
  crystal: Crystal;
}

export const CrystalCard = ({ crystal }: CrystalCardProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(crystal.slug);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(crystal.slug);
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'love': return 'bg-blush/10 text-blush';
      case 'clarity': return 'bg-softgray/50 text-charcoal/70';
      case 'abundance': return 'bg-sand/70 text-charcoal/70';
      case 'wisdom': return 'bg-lavender/20 text-lavender';
      case 'luck': return 'bg-sage/30 text-charcoal/70';
      case 'protection': return 'bg-charcoal/10 text-charcoal/70';
      case 'intuition': return 'bg-softgray/50 text-charcoal/70';
      case 'vitality': return 'bg-blush/20 text-blush';
      default: return 'bg-lavender/10 text-lavender';
    }
  };

  return (
    <motion.div 
      className="crystal-card bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/encyclopedia/${crystal.slug}`}>
        <div className="block cursor-pointer">
          <img 
            src={crystal.image} 
            alt={crystal.name} 
            className="w-full h-48 object-cover" 
          />
          <div className="p-5">
            <h3 className="font-serif text-xl font-semibold mb-2">{crystal.name}</h3>
            <p className="text-sm opacity-70 mb-3">{crystal.shortDescription}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium px-3 py-1 ${getCategoryColor(crystal.category)} rounded-full`}>
                {crystal.category}
              </span>
              <button 
                className={`transition-colors ${isFavorite ? 'text-blush' : 'text-lavender hover:text-lavender/70'}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={isFavorite ? "fill-current" : ""} size={20} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
