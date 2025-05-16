import { useState } from "react";
import { Helmet } from "react-helmet";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CrystalGrid } from "@/components/encyclopedia/CrystalGrid";
import { crystals } from "@/data/crystals";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function EncyclopediaList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Get unique categories from crystals
  const categories = Array.from(new Set(crystals.map(crystal => crystal.category)));
  
  // Filter crystals based on search term and category
  const filteredCrystals = crystals.filter(crystal => {
    const matchesSearch = searchTerm === "" || 
      crystal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crystal.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === null || crystal.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Crystal Encyclopedia | Crystal Essence</title>
        <meta 
          name="description" 
          content="Explore our extensive collection of healing crystals and their unique properties, energies, and spiritual benefits."
        />
        <meta property="og:title" content="Crystal Encyclopedia | Crystal Essence" />
        <meta property="og:description" content="Explore our collection of healing crystals and learn about their properties, energies, and spiritual benefits." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Explore"
            badgeColor="bg-lavender/20 text-lavender"
            title="Crystal Encyclopedia"
            description="Discover our collection of healing crystals and their unique properties"
          />
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search crystals by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-full border-softgray focus:border-lavender"
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter(null)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    categoryFilter === null
                      ? "bg-lavender text-white"
                      : "bg-softgray/50 text-charcoal/70 hover:bg-lavender/20"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      categoryFilter === category
                        ? "bg-lavender text-white"
                        : "bg-softgray/50 text-charcoal/70 hover:bg-lavender/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredCrystals.length > 0 ? (
            <CrystalGrid crystals={filteredCrystals} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No crystals found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
