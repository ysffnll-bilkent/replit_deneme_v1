import { useState } from "react";
import { Helmet } from "react-helmet";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogPosts";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Get unique categories from blog posts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Filter blog posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === null || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Spiritual Wisdom Blog | Crystal Essence</title>
        <meta 
          name="description" 
          content="Explore our collection of articles on crystal healing, spiritual practices, and mindfulness for your spiritual journey."
        />
        <meta property="og:title" content="Spiritual Wisdom Blog | Crystal Essence" />
        <meta property="og:description" content="Read our articles on crystal healing, spiritual practices, and mindfulness for your spiritual journey." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-lavender/10">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Insights"
            badgeColor="bg-sage/30 text-charcoal/70"
            title="Spiritual Wisdom Blog"
            description="Explore our collection of articles on crystal healing, spiritual practices, and mindfulness"
          />
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search articles..."
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
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
