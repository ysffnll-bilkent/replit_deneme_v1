import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DailyRecommendation } from "@/components/home/DailyRecommendation";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CrystalGrid } from "@/components/encyclopedia/CrystalGrid";
import { NewsletterSection } from "@/components/shared/NewsletterSection";
import { crystals } from "@/data/crystals";
import { blogPosts } from "@/data/blogPosts";
import { BlogCard } from "@/components/blog/BlogCard";

export default function Home() {
  // Get only the first 3 blog posts for the homepage
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Crystal Essence | Spiritual Wellness Platform</title>
        <meta 
          name="description" 
          content="Discover your spiritual connection with our curated collection of crystals, personalized insights, and handcrafted jewelry to enhance your spiritual journey."
        />
        <meta property="og:title" content="Crystal Essence | Spiritual Wellness Platform" />
        <meta property="og:description" content="Explore our collection of crystals, take spiritual tests, and design custom jewelry to enhance your spiritual journey." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Daily Recommendation */}
      <DailyRecommendation />

      {/* Encyclopedia Preview Section */}
      <section id="encyclopedia-preview" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Explore"
            badgeColor="bg-lavender/20 text-lavender"
            title="Crystal Encyclopedia"
            description="Discover our collection of healing crystals and their unique properties"
          />
          
          <CrystalGrid crystals={crystals} showAll={false} />
          
          <div className="text-center mt-12">
            <Link href="/encyclopedia">
              <motion.a
                className="inline-flex items-center px-6 py-3 border-2 border-lavender text-lavender hover:bg-lavender hover:text-white rounded-full transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Crystals</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog-preview" className="py-16 md:py-24 bg-lavender/10">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Insights"
            badgeColor="bg-sage/30 text-charcoal/70"
            title="Spiritual Wisdom Blog"
            description="Explore our collection of articles on crystal healing, spiritual practices, and mindfulness"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/blog">
              <motion.a
                className="inline-flex items-center px-6 py-3 border-2 border-lavender text-lavender hover:bg-lavender hover:text-white rounded-full transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Articles</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </Link>
          </div>
        </div>
      </section>

      {/* Etsy Link Section */}
      <section className="py-16 bg-blush/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-blush/30 text-blush font-medium text-sm mb-4">
                Handcrafted
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Visit Our Etsy Shop</h2>
              <p className="text-lg opacity-80 mb-8">
                Browse our collection of handcrafted crystal jewelry, healing kits, and spiritual tools made with love and intention.
              </p>
              <Link href="/etsy-redirect">
                <motion.a
                  className="inline-flex items-center px-8 py-4 bg-blush hover:bg-blush/90 text-white rounded-full transition-colors shadow-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Shop on Etsy</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
