import React from 'react';
import { Star, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#' },
      { name: 'Movies', href: '#' },
      { name: 'TV Shows', href: '#' },
      { name: 'Genres', href: '#' },
      { name: 'Top Rated', href: '#' },
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
    'Company': [
      { name: 'About BingeVerse', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Partnerships', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-[#1F1F1F] border-t border-[#333] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-8 h-8 text-[#F5C518]" fill="currentColor" />
              <span className="text-2xl font-bold text-white font-['Poppins']">
                BingeVerse
              </span>
            </div>
            <p className="text-[#B0B0B0] mb-4 leading-relaxed">
              Your ultimate destination for movie and series ratings, reviews, and recommendations. 
              Discover your next favorite film or show with our comprehensive entertainment database.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-[#B0B0B0] hover:text-[#F5C518] transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 font-['Poppins']">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[#B0B0B0] hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-[#333] pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2 font-['Poppins']">Stay Updated</h3>
            <p className="text-[#B0B0B0] mb-4">
              Get the latest movie releases, reviews, and entertainment news delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#121212] text-white px-4 py-2 rounded-l-lg border border-[#333] focus:outline-none focus:border-[#F5C518] transition-colors"
              />
              <button className="bg-[#E50914] text-white px-6 py-2 rounded-r-lg hover:bg-[#d40812] transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#333] pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#B0B0B0] text-sm mb-4 md:mb-0">
            © {currentYear} BingeVerse. All rights reserved. | Movie data provided by TMDb
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-[#B0B0B0]">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-white transition-colors">
              DMCA Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;