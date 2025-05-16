import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Gem, Heart, User, Menu, X, Instagram } from "lucide-react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/encyclopedia", label: "Encyclopedia" },
    { href: "/tests", label: "Tests" },
    { href: "/customizer", label: "Customizer" },
    { href: "/blog", label: "Blog" },
    { href: "/etsy-redirect", label: "Etsy" },
    { href: "/instagram-redirect", label: "Instagram" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Gem className="text-lavender text-2xl" />
            <span className="font-serif text-xl font-semibold">Mine Jewellery Art</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-charcoal hover:text-lavender transition-colors py-2 ${
                  location === link.href ? "text-lavender" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="hidden md:block text-charcoal hover:text-lavender transition-colors">
              <Heart size={20} />
            </Link>
            <Link href="/profile" className="hidden md:block text-charcoal hover:text-lavender transition-colors">
              <User size={20} />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-charcoal" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pt-2 pb-4 space-y-1"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 hover:bg-sand px-2 rounded ${
                  location === link.href ? "bg-sand text-lavender" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 hover:bg-sand px-2 rounded ${
                location === "/profile" ? "bg-sand text-lavender" : ""
              }`}
            >
              Profile
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
};
