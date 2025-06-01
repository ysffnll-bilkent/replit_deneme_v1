import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { EnhancedCustomizer } from "@/components/customizer/EnhancedCustomizer";
import { useToast } from "@/hooks/use-toast";

export default function Customizer() {
  const [selectedItemType, setSelectedItemType] = useState("necklace");
  const [selectedCrystal, setSelectedCrystal] = useState("amethyst");
  const [selectedMaterial, setSelectedMaterial] = useState("gold");
  const [selectedLength, setSelectedLength] = useState("18");
  const { toast } = useToast();

  const handleSaveDesign = () => {
    // Save design to localStorage
    const design = {
      itemType: selectedItemType,
      crystal: selectedCrystal,
      material: selectedMaterial,
      length: selectedLength,
      date: new Date().toISOString()
    };
    
    const savedDesigns = localStorage.getItem('savedDesigns');
    const designs = savedDesigns ? JSON.parse(savedDesigns) : [];
    designs.push(design);
    localStorage.setItem('savedDesigns', JSON.stringify(designs));
    
    toast({
      title: "Design Saved",
      description: "Your custom design has been saved to your profile.",
    });
  };

  const handleOrderCustomPiece = () => {
    // In a real app, this would open a checkout process
    toast({
      title: "Order Initiated",
      description: "You're being redirected to complete your custom order.",
    });
    
    // Redirect to Etsy after a short delay
    setTimeout(() => {
      window.location.href = "/etsy-redirect";
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Custom Crystal Jewelry Designer | Mine Jewellery Art</title>
        <meta 
          name="description" 
          content="Design your own personalized crystal jewelry piece with our interactive customizer. Choose your crystal, setting, and style."
        />
        <meta property="og:title" content="Custom Crystal Jewelry Designer | Mine Jewellery Art" />
        <meta property="og:description" content="Design your own personalized crystal jewelry with our interactive customizer." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Create"
            badgeColor="bg-sage/30 text-charcoal/70"
            title="Custom Crystal Jewelry"
            description="Design your own personalized crystal jewelry piece that resonates with your energy"
          />
          
          <motion.div 
            className="bg-sand/50 rounded-xl shadow-md p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Full-width Crystal Customizer */}
              <div className="w-full">
                <EnhancedCustomizer
                  selectedItemType={selectedItemType}
                  selectedCrystal={selectedCrystal}
                  selectedMaterial={selectedMaterial}
                  selectedLength={selectedLength}
                  setSelectedItemType={setSelectedItemType}
                  setSelectedCrystal={setSelectedCrystal}
                  setSelectedMaterial={setSelectedMaterial}
                  setSelectedLength={setSelectedLength}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Additional Information */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.div>
                <h3 className="font-serif text-xl font-semibold mb-3">Custom Design</h3>
                <p className="opacity-80">
                  Each piece is handcrafted specifically for you based on your customization choices.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-blush/20 flex items-center justify-center mx-auto mb-4" 
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blush" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                </motion.div>
                <h3 className="font-serif text-xl font-semibold mb-3">Energy Aligned</h3>
                <p className="opacity-80">
                  We cleanse and charge each crystal to ensure its energy is aligned for your intentions.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                </motion.div>
                <h3 className="font-serif text-xl font-semibold mb-3">Ethically Sourced</h3>
                <p className="opacity-80">
                  We use only ethically sourced materials and crystals from trusted suppliers.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="font-serif text-2xl font-semibold mb-4">Ready to Create Your Custom Piece?</h3>
              <p className="text-lg max-w-2xl mx-auto opacity-80 mb-8">
                Design a one-of-a-kind crystal jewelry piece that's uniquely aligned with your energy and intentions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveDesign}
                >
                  Save Current Design
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-blush hover:bg-blush/90 text-white rounded-full transition-colors shadow-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrderCustomPiece}
                >
                  Order Custom Piece
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
