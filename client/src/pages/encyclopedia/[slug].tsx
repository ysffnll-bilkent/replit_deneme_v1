import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, CheckCircle } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getCrystalBySlug, Crystal, crystals } from "@/data/crystals";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";

export default function EncyclopediaDetail() {
  const [, params] = useRoute("/encyclopedia/:slug");
  const [crystal, setCrystal] = useState<Crystal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarCrystals, setSimilarCrystals] = useState<Crystal[]>([]);
  const { favorites, toggleFavorite } = useFavorites();
  
  const slug = params?.slug || "";
  const isFavorite = favorites.includes(slug);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Get crystal data
    const crystalData = getCrystalBySlug(slug);
    
    if (crystalData) {
      setCrystal(crystalData);
      
      // Find similar crystals (same category or similar properties)
      const similar = crystals
        .filter((c) => 
          c.id !== crystalData.id && 
          (c.category === crystalData.category || 
           c.chakras.some(chakra => crystalData.chakras.includes(chakra)))
        )
        .slice(0, 3);
      
      setSimilarCrystals(similar);
    }
    
    setIsLoading(false);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse w-16 h-16 rounded-full bg-lavender/50"></div>
      </div>
    );
  }

  if (!crystal) {
    return <NotFound />;
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(crystal.slug);
  };

  return (
    <>
      <Helmet>
        <title>{crystal.name} - Crystal Encyclopedia | Crystal Essence</title>
        <meta 
          name="description" 
          content={`Learn about ${crystal.name}: ${crystal.shortDescription}. Discover its properties, chakras, and spiritual benefits.`}
        />
        <meta property="og:title" content={`${crystal.name} - Crystal Encyclopedia | Crystal Essence`} />
        <meta property="og:description" content={crystal.shortDescription} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link href="/encyclopedia">
              <a className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Encyclopedia</span>
              </a>
            </Link>
          </div>
          
          {/* Crystal Header */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-12">
            <motion.div 
              className="w-full md:w-2/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={crystal.image} 
                  alt={crystal.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-lavender/20 text-lavender font-medium text-sm mb-4">
                {crystal.category}
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">{crystal.name}</h1>
              
              <p className="text-xl italic mb-6 opacity-80">{crystal.shortDescription}</p>
              
              <div className="mb-8">
                <h3 className="font-medium text-lg mb-3">Properties:</h3>
                <ul className="space-y-2">
                  {crystal.properties.map((property, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-lavender mt-1 mr-3 flex-shrink-0" size={18} />
                      <span>{property}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div>
                  <h3 className="font-medium mb-2">Chakras</h3>
                  <div className="flex flex-wrap gap-2">
                    {crystal.chakras.map((chakra) => (
                      <span 
                        key={chakra} 
                        className="inline-block px-3 py-1 bg-lavender/10 text-lavender rounded-full text-sm"
                      >
                        {chakra}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Zodiac Signs</h3>
                  <div className="flex flex-wrap gap-2">
                    {crystal.zodiacSigns.map((sign) => (
                      <span 
                        key={sign} 
                        className="inline-block px-3 py-1 bg-sage/30 text-charcoal/70 rounded-full text-sm"
                      >
                        {sign}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Elements</h3>
                  <div className="flex flex-wrap gap-2">
                    {crystal.elements.map((element) => (
                      <span 
                        key={element} 
                        className="inline-block px-3 py-1 bg-blush/10 text-blush rounded-full text-sm"
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  onClick={handleFavoriteToggle}
                  variant="outline"
                  className={`border-2 ${
                    isFavorite 
                      ? "border-blush bg-blush/10 text-blush" 
                      : "border-lavender text-lavender hover:bg-lavender/10"
                  } rounded-full px-6 py-2 flex items-center gap-2`}
                >
                  <Heart className={isFavorite ? "fill-current" : ""} size={18} />
                  <span>{isFavorite ? "Saved to Favorites" : "Add to Favorites"}</span>
                </Button>
                
                <Link href="/customizer">
                  <Button
                    variant="default"
                    className="bg-lavender hover:bg-lavender/90 text-white rounded-full px-6 py-2"
                  >
                    Design with this Crystal
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Crystal Description */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-semibold mb-6">About {crystal.name}</h2>
            <div className="prose max-w-none lg:prose-lg">
              <p>{crystal.longDescription}</p>
            </div>
          </div>
          
          {/* Similar Crystals */}
          {similarCrystals.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarCrystals.map((similar) => (
                  <Link key={similar.id} href={`/encyclopedia/${similar.slug}`}>
                    <a className="block group">
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
                        <img 
                          src={similar.image} 
                          alt={similar.name} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                          <h3 className="font-serif text-xl font-semibold mb-2">{similar.name}</h3>
                          <p className="text-sm opacity-70">{similar.shortDescription}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
