import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink } from "lucide-react";

export default function EtsyRedirect() {
  const [countdown, setCountdown] = useState(5);
  const etsyShopUrl = "https://www.etsy.com/shop/crystalessence"; // Example URL
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to Etsy shop
      window.location.href = etsyShopUrl;
    }
  }, [countdown, etsyShopUrl]);

  return (
    <>
      <Helmet>
        <title>Redirecting to Etsy Shop | Crystal Essence</title>
        <meta 
          name="description" 
          content="You are being redirected to our Etsy shop where you can purchase handcrafted crystal jewelry and spiritual tools."
        />
        <meta property="og:title" content="Redirecting to Etsy Shop | Crystal Essence" />
        <meta property="og:description" content="Visit our Etsy shop for handcrafted crystal jewelry and spiritual tools." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-20 md:py-32 bg-blush/10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-blush/30 text-blush font-medium text-sm mb-4">
                Handcrafted
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Redirecting to Our Etsy Shop</h1>
              <p className="text-lg opacity-80 mb-8">
                You'll be redirected to our Etsy shop in {countdown} seconds, where you can browse our collection of handcrafted crystal jewelry and spiritual tools.
              </p>
              
              <div className="mb-10">
                <div className="w-full bg-softgray h-2 rounded-full">
                  <motion.div 
                    className="bg-blush h-2 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(5 - countdown) / 5 * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={etsyShopUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-blush hover:bg-blush/90 text-white rounded-full transition-colors shadow-md font-medium"
                >
                  <span>Go to Etsy Now</span>
                  <ExternalLink size={18} className="ml-2" />
                </a>
                <Link href="/">
                  <a className="inline-flex items-center px-8 py-4 border-2 border-lavender text-lavender hover:bg-lavender hover:text-white rounded-full transition-colors font-medium">
                    <span>Return to Home</span>
                  </a>
                </Link>
              </div>
              
              <div className="mt-12 p-6 bg-white/50 rounded-xl">
                <h2 className="font-serif text-xl font-semibold mb-4">About Our Etsy Shop</h2>
                <p className="opacity-80">
                  Our Etsy shop features handcrafted crystal jewelry, healing kits, and spiritual tools made with love and intention. Each piece is designed to enhance your spiritual journey and align with your energy.
                </p>
                <p className="opacity-80 mt-4">
                  We also offer custom orders based on your specific needs and intentions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
