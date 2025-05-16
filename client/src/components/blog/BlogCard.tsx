import { Link } from "wouter";
import { motion } from "framer-motion";
import { BlogPost } from "@/data/blogPosts";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'crystal healing': return 'bg-lavender/10 text-lavender';
      case 'divination': return 'bg-blush/10 text-blush';
      case 'lifestyle': return 'bg-sage/30 text-charcoal/70';
      case 'spirituality': return 'bg-sand/70 text-charcoal/70';
      case 'meditation': return 'bg-lavender/20 text-lavender';
      default: return 'bg-softgray/30 text-charcoal/70';
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <a className="block">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="p-6">
            <div className="flex items-center mb-3">
              <span className="text-xs text-charcoal/60">{formatDate(post.date)}</span>
              <span className="mx-2 text-charcoal/30">•</span>
              <span className={`text-xs px-2 py-1 ${getCategoryColor(post.category)} rounded-full`}>
                {post.category}
              </span>
            </div>
            <h3 className="font-serif text-xl font-semibold mb-3">{post.title}</h3>
            <p className="text-sm opacity-70 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <motion.div 
              className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors font-medium text-sm"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>Read Article</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};
