import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); 
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Share a Recipe', path: '/share-recipe' },
    { name: 'Authors', path: '/authors' },
  ];

  return (
    <nav className="bg-[#1E4B6D] text-white shadow-md">
      <div className="container mx-auto px-3 py-1 mb-0 flex justify-center">
        <div className="flex space-x-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                  isActive ? 'bg-white text-[#1E4B6D]' : 'hover:bg-[#164060]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
