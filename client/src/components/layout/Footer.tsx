import { Link } from "wouter";
import { Gem, Instagram } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Gem className="text-lavender text-xl" />
              <span className="font-serif text-lg font-semibold">Mine Jewellery Art</span>
            </div>
            <p className="opacity-70 text-sm mb-6">
              Your source for spiritual growth, crystal wisdom, and personalized energy tools.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/ysffnll/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a 
                href="https://www.etsy.com/shop/minejewelleryart" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                  <path d="M384 348c-1.75 10.75-13.75 110-15.5 132-117.879-4.299-219.895-4.743-368.5 0v-25.5c45.457-8.948 60.627-8.019 61-35.25 1.793-72.322 3.524-244.143 0-322-1.029-28.46-12.13-26.765-61-36v-25.5c73.886 2.358 255.933 8.551 362.999-3.75-3.5 38.25-7.75 126.5-7.75 126.5H332C320.947 115.665 313.241 68 277.25 68h-137c-10.25 0-10.75 3.5-10.75 9.75V241.5c58 .5 88.5-2.5 88.5-2.5 29.77-.951 27.56-8.502 40.75-65.251h25.75c-4.407 101.351-3.91 61.829-1.75 160.25H257c-9.155-40.086-9.065-61.045-39.501-61.5 0 0-21.5-2-88-2v139c0 26 14.25 38.25 44.25 38.25H263c63.636 0 66.564-24.996 98.751-99.75H384z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-70">
              <li><Link href="/home" className="hover:text-lavender transition-colors">Home</Link></li>
              <li><Link href="/encyclopedia" className="hover:text-lavender transition-colors">Encyclopedia</Link></li>
              <li><Link href="/tests" className="hover:text-lavender transition-colors">Spiritual Tests</Link></li>
              <li><Link href="/customizer" className="hover:text-lavender transition-colors">Crystal Jewelry</Link></li>
              <li><Link href="/" className="hover:text-lavender transition-colors">Crystal Energy</Link></li>
              <li><Link href="/blog" className="hover:text-lavender transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2 opacity-70">
              <li><Link href="/blog" className="hover:text-lavender transition-colors">Crystal Care Guide</Link></li>
              <li><Link href="/blog" className="hover:text-lavender transition-colors">Meditation Practices</Link></li>
              <li><Link href="/blog" className="hover:text-lavender transition-colors">Chakra Balancing</Link></li>
              <li><Link href="/blog" className="hover:text-lavender transition-colors">FAQs</Link></li>
              <li><a href="#" className="hover:text-lavender transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Social & Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Connect With Us</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <a 
                  href="https://www.etsy.com/shop/minejewelleryart" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-lavender transition-colors"
                >
                  <span className="mr-2">Shop on Etsy</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/ysffnll/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-lavender transition-colors"
                >
                  <span className="mr-2">Follow on Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-60 mb-4 md:mb-0">
            &copy; {currentYear} Mine Jewellery Art. All rights reserved.
          </p>
          <p className="text-sm opacity-60">
            Designed with love and positive energy
          </p>
        </div>
      </div>
    </footer>
  );
};
