import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Gem } from "lucide-react";

export default function CrystalEnergyVisualization() {
  return (
    <>
      <Helmet>
        <title>Crystal Energy Visualization | Mine Jewellery Art</title>
        <meta 
          name="description" 
          content="Experience advanced 3D crystal energy visualization and customization tools for spiritual jewelry design."
        />
        <meta property="og:title" content="Crystal Energy Visualization | Mine Jewellery Art" />
        <meta property="og:description" content="Advanced 3D crystal visualization and energy customization tools." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <section className="py-20 md:py-32 bg-gradient-to-br from-lavender/10 via-blush/5 to-sand/10 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-lavender/30 text-lavender font-medium text-sm mb-4">
                <Sparkles className="inline w-4 h-4 mr-2" />
                Advanced Visualization
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
                Crystal Energy Visualization
              </h1>
              <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
                Experience the spiritual energy of crystals through advanced 3D visualization technology. 
                Design and customize your perfect crystal jewelry with real-time energy flow visualization.
              </p>
            </motion.div>

            {/* Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-white/50"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-lavender to-blush rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gem className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                  Enhanced 3D Experience Coming Soon
                </h2>
                
                <p className="text-lg opacity-80 mb-8">
                  We're developing an advanced 3D crystal energy visualization system that will allow you to:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lavender rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-medium mb-1">Real-time Energy Flow</h3>
                      <p className="text-sm opacity-70">Visualize crystal energy patterns and chakra alignments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blush rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-medium mb-1">Interactive 3D Models</h3>
                      <p className="text-sm opacity-70">Rotate, zoom, and customize crystal formations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-lavender rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-medium mb-1">Custom Arrangements</h3>
                      <p className="text-sm opacity-70">Design personalized crystal layouts and combinations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blush rounded-full mt-2"></div>
                    <div>
                      <h3 className="font-medium mb-1">Spiritual Guidance</h3>
                      <p className="text-sm opacity-70">AI-powered recommendations based on your energy needs</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/customizer">
                    <a className="inline-flex items-center px-8 py-4 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium">
                      <span>Try Current Customizer</span>
                    </a>
                  </Link>
                  <Link href="/">
                    <a className="inline-flex items-center px-8 py-4 border-2 border-blush text-blush hover:bg-blush hover:text-white rounded-full transition-colors font-medium">
                      <ArrowLeft size={18} className="mr-2" />
                      <span>Back to Home</span>
                    </a>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Current Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-white/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-6 h-6 text-lavender" />
                </div>
                <h3 className="font-semibold mb-2">3D Customizer</h3>
                <p className="text-sm opacity-70">
                  Our current 3D customizer allows you to design crystal jewelry with real-time preview.
                </p>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blush/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-blush" />
                </div>
                <h3 className="font-semibold mb-2">Crystal Encyclopedia</h3>
                <p className="text-sm opacity-70">
                  Explore our comprehensive guide to crystal properties and spiritual meanings.
                </p>
              </div>
              
              <div className="bg-white/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="w-6 h-6 text-lavender" />
                </div>
                <h3 className="font-semibold mb-2">Spiritual Tests</h3>
                <p className="text-sm opacity-70">
                  Take personalized tests to discover which crystals align with your energy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}