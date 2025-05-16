import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, History, Star, User, Settings } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getCrystalBySlug, Crystal } from "@/data/crystals";
import { CrystalCard } from "@/components/encyclopedia/CrystalCard";

interface SavedDesign {
  itemType: string;
  crystal: string;
  material: string;
  length: string;
  date: string;
}

interface TestResultHistory {
  testId: string;
  testName: string;
  resultScore: string;
  date: string;
}

export default function Profile() {
  const { favorites } = useFavorites();
  const [favoriteCrystals, setFavoriteCrystals] = useState<Crystal[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  const [testResults, setTestResults] = useState<TestResultHistory[]>([]);
  const [userName, setUserName] = useState("Crystal Enthusiast");
  const [email, setEmail] = useState("user@example.com");
  
  useEffect(() => {
    // Get favorite crystals
    const crystalsList = favorites.map(slug => getCrystalBySlug(slug)).filter(Boolean) as Crystal[];
    setFavoriteCrystals(crystalsList);
    
    // Get saved designs from localStorage
    const storedDesigns = localStorage.getItem('savedDesigns');
    if (storedDesigns) {
      try {
        setSavedDesigns(JSON.parse(storedDesigns));
      } catch (error) {
        console.error('Failed to parse saved designs:', error);
        setSavedDesigns([]);
      }
    }
    
    // Get test results from localStorage
    const storedResults = localStorage.getItem('testResults');
    if (storedResults) {
      try {
        setTestResults(JSON.parse(storedResults));
      } catch (error) {
        console.error('Failed to parse test results:', error);
        setTestResults([]);
      }
    }
    
    // Get user profile from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        if (profile.name) setUserName(profile.name);
        if (profile.email) setEmail(profile.email);
      } catch (error) {
        console.error('Failed to parse user profile:', error);
      }
    }
  }, [favorites]);

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify({ name: userName, email }));
    alert('Profile saved successfully!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Your Profile | Crystal Essence</title>
        <meta 
          name="description" 
          content="View your saved favorites, test results, and custom designs in your Crystal Essence profile."
        />
        <meta property="og:title" content="Your Profile | Crystal Essence" />
        <meta property="og:description" content="Manage your saved favorites, test results, and custom designs." />
        <meta property="og:type" content="profile" />
      </Helmet>
      
      <section className="py-16 md:py-24 bg-lavender/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <motion.div 
              className="mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-full bg-lavender/20 flex items-center justify-center">
                <User size={36} className="text-lavender" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">{userName}</h1>
                <p className="opacity-70">Welcome to your spiritual journey dashboard</p>
              </div>
            </motion.div>
            
            {/* Profile Tabs */}
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span className="hidden sm:inline">Favorites</span>
                </TabsTrigger>
                <TabsTrigger value="designs" className="flex items-center gap-2">
                  <Star size={16} />
                  <span className="hidden sm:inline">Saved Designs</span>
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <History size={16} />
                  <span className="hidden sm:inline">Test Results</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Your Favorite Crystals</h2>
                  
                  {favoriteCrystals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteCrystals.map((crystal) => (
                        <CrystalCard key={crystal.id} crystal={crystal} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-sand/30 rounded-xl">
                      <Heart size={48} className="mx-auto mb-4 text-lavender/50" />
                      <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
                      <p className="text-gray-500 mb-6">You haven't saved any crystals to your favorites</p>
                      <Link href="/encyclopedia">
                        <a className="inline-flex items-center px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-sm font-medium">
                          Explore Crystals
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Saved Designs Tab */}
              <TabsContent value="designs">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Your Saved Designs</h2>
                  
                  {savedDesigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedDesigns.map((design, index) => (
                        <div key={index} className="bg-sand/30 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-serif text-xl font-semibold">
                              {design.crystal.charAt(0).toUpperCase() + design.crystal.slice(1)} {design.itemType}
                            </h3>
                            <span className="text-xs text-charcoal/60">{formatDate(design.date)}</span>
                          </div>
                          <ul className="space-y-2 mb-6">
                            <li className="flex justify-between">
                              <span className="opacity-70">Crystal:</span>
                              <span className="font-medium">{design.crystal.charAt(0).toUpperCase() + design.crystal.slice(1)}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="opacity-70">Item Type:</span>
                              <span className="font-medium">{design.itemType.charAt(0).toUpperCase() + design.itemType.slice(1)}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="opacity-70">Material:</span>
                              <span className="font-medium">{design.material.charAt(0).toUpperCase() + design.material.slice(1)}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="opacity-70">Length:</span>
                              <span className="font-medium">{design.length}"</span>
                            </li>
                          </ul>
                          <Link href="/customizer">
                            <a className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors font-medium text-sm">
                              <span>Edit Design</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </a>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-sand/30 rounded-xl">
                      <Star size={48} className="mx-auto mb-4 text-lavender/50" />
                      <h3 className="text-xl font-medium mb-2">No saved designs</h3>
                      <p className="text-gray-500 mb-6">You haven't saved any custom jewelry designs yet</p>
                      <Link href="/customizer">
                        <a className="inline-flex items-center px-6 py-3 bg-blush hover:bg-blush/90 text-white rounded-full transition-colors shadow-sm font-medium">
                          Create a Design
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Test Results Tab */}
              <TabsContent value="results">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Your Test Results</h2>
                  
                  {testResults.length > 0 ? (
                    <div className="space-y-6">
                      {testResults.map((result, index) => (
                        <div key={index} className="bg-lavender/10 rounded-xl p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-serif text-xl font-semibold">{result.testName}</h3>
                            <span className="text-xs text-charcoal/60">{formatDate(result.date)}</span>
                          </div>
                          <p className="mb-4">
                            Your result: <span className="font-medium text-lavender">{result.resultScore}</span>
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="opacity-70 text-sm">
                              This result reflects your energy at the time of taking the test.
                            </span>
                            <Link href="/tests">
                              <a className="inline-flex items-center text-lavender hover:text-lavender/70 transition-colors font-medium text-sm">
                                <span>Retake Test</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </a>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-sand/30 rounded-xl">
                      <History size={48} className="mx-auto mb-4 text-lavender/50" />
                      <h3 className="text-xl font-medium mb-2">No test results</h3>
                      <p className="text-gray-500 mb-6">You haven't taken any spiritual tests yet</p>
                      <Link href="/tests">
                        <a className="inline-flex items-center px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-sm font-medium">
                          Take a Test
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-semibold mb-6">Profile Settings</h2>
                  
                  <div className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-medium mb-2">Display Name</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-softgray focus:border-lavender focus:ring focus:ring-lavender/20 outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-softgray focus:border-lavender focus:ring focus:ring-lavender/20 outline-none"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 bg-lavender hover:bg-lavender/90 text-white rounded-full transition-colors shadow-md font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
}
