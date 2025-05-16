import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getBlogPostBySlug, BlogPost, blogPosts } from "@/data/blogPosts";
import { formatDate } from "@/lib/utils";
import NotFound from "@/pages/not-found";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  const slug = params?.slug || "";

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Get blog post data
    const postData = getBlogPostBySlug(slug);
    
    if (postData) {
      setPost(postData);
      
      // Find related posts (same category)
      const related = blogPosts
        .filter((p) => 
          p.id !== postData.id && 
          p.category === postData.category
        )
        .slice(0, 2);
      
      setRelatedPosts(related);
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

  if (!post) {
    return <NotFound />;
  }

  // Convert content markdown to HTML (very simplified)
  const renderContent = (content: string[]) => {
    return content.map((paragraph, idx) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif text-2xl font-semibold mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('- ')) {
        return (
          <li key={idx} className="ml-6 mb-2">
            {paragraph.replace('- ', '')}
          </li>
        );
      } else if (paragraph.startsWith('**')) {
        return (
          <p key={idx} className="font-bold mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      } else {
        return (
          <p key={idx} className="mb-4">
            {paragraph}
          </p>
        );
      }
    });
  };

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
    <>
      <Helmet>
        <title>{post.title} | Crystal Essence Blog</title>
        <meta 
          name="description" 
          content={post.excerpt}
        />
        <meta property="og:title" content={`${post.title} | Crystal Essence Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.coverImage} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
      </Helmet>
      
      <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link href="/blog">
              <a className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Blog</span>
              </a>
            </Link>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg h-64 md:h-96">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <div className="mb-10 text-center">
              <div className="inline-block px-4 py-1 rounded-full mb-4 text-sm font-medium" 
                   style={{ backgroundColor: getCategoryColor(post.category).split(' ')[0], color: getCategoryColor(post.category).split(' ')[1] }}>
                {post.category}
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm opacity-70">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
            
            {/* Post Content */}
            <div className="prose max-w-none lg:prose-lg">
              {renderContent(post.content)}
            </div>
            
            {/* Author Bio */}
            <div className="mt-12 p-6 bg-lavender/10 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center">
                  <User size={24} className="text-lavender" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold">About {post.author}</h3>
                  <p className="text-sm opacity-80">
                    {post.author} is a passionate crystal enthusiast and spiritual practitioner with years of experience in holistic healing and energy work.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="font-serif text-2xl font-semibold mb-6 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.id} href={`/blog/${related.slug}`}>
                      <a className="block group">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 group-hover:-translate-y-2">
                          <img 
                            src={related.coverImage} 
                            alt={related.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-5">
                            <h3 className="font-serif text-xl font-semibold mb-2">{related.title}</h3>
                            <p className="text-sm opacity-70 line-clamp-2">{related.excerpt}</p>
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
      </div>
    </>
  );
}
