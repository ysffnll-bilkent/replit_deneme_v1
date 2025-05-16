import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would send this to your API
    toast({
      title: "Subscription confirmed!",
      description: "Thank you for joining our spiritual community.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-lavender/10 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-2/3">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3">Join Our Spiritual Community</h3>
              <p className="opacity-80 mb-6">
                Subscribe to receive crystal wisdom, exclusive offers, and updates on new products and spiritual practices.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-full border border-softgray focus:border-lavender focus:ring focus:ring-lavender/20 outline-none flex-1" 
                />
                <motion.button 
                  type="submit" 
                  className="px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <motion.div 
                className="w-28 h-28 rounded-full bg-lavender/20 flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="text-lavender text-4xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
