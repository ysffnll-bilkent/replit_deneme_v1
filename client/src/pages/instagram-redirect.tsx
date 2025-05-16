import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

export default function InstagramRedirect() {
  const [countdown, setCountdown] = useState(5);
  const instagramUrl = "https://www.instagram.com/ysffnll/";
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to Instagram page
      window.location.href = instagramUrl;
    }
  }, [countdown, instagramUrl]);

  return (
    <>
      <Helmet>
        <title>Redirecting to Instagram | Mine Jewellery Art</title>
        <meta 
          name="description" 
          content="You are being redirected to our Instagram page where you can see our latest creations and updates."
        />
        <meta property="og:title" content="Redirecting to Instagram | Mine Jewellery Art" />
        <meta property="og:description" content="Follow us on Instagram for the latest creations and updates from Mine Jewellery Art." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-20 md:py-32 bg-lavender/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-lavender/30 text-lavender font-medium text-sm mb-4">
                Social Media
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Redirecting to Our Instagram</h1>
              <p className="text-lg opacity-80 mb-8">
                You'll be redirected to our Instagram page in {countdown} seconds, where you can follow us for the latest updates, behind-the-scenes content, and inspiration.
              </p>
              
              <div className="mb-10">
                <div className="w-full bg-softgray h-2 rounded-full">
                  <motion.div 
                    className="bg-lavender h-2 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(5 - countdown) / 5 * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium"
                >
                  <span>Go to Instagram Now</span>
                  <ExternalLink size={18} className="ml-2" />
                </a>
                <Link href="/">
                  <a className="inline-flex items-center px-8 py-4 border-2 border-blush text-blush hover:bg-blush hover:text-white rounded-full transition-colors font-medium">
                    <span>Return to Home</span>
                  </a>
                </Link>
              </div>
              
              <div className="mt-12 p-6 bg-white/50 rounded-xl">
                <h2 className="font-serif text-xl font-semibold mb-4">Connect With Us</h2>
                <p className="opacity-80">
                  Follow us on Instagram to see our latest handcrafted crystal jewelry, behind-the-scenes of our creative process, and inspirational content related to crystal healing and spiritual wellness.
                </p>
                <p className="opacity-80 mt-4">
                  We also share special promotions and announcements first with our Instagram community.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}