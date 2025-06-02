'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavbarProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  sections = [],
  activeSection,
  onSectionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.navbar-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
    open: {
      x: '0%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
  };

  const hamburgerLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: 45,
      y: 6,
    },
  };

  const hamburgerLine2Variants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: {
      rotate: -45,
      y: -6,
    },
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-8 h-8 flex flex-col justify-center items-center navbar-menu"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="w-6 h-0.5 bg-white mb-1.5"
          variants={hamburgerLineVariants}
          animate={isOpen ? 'open' : 'closed'}
        />
        <motion.div
          className="w-6 h-0.5 bg-white"
          variants={hamburgerLine2Variants}
          animate={isOpen ? 'open' : 'closed'}
        />
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <motion.div
        className="fixed top-0 right-0 h-full w-80 bg-black z-40 navbar-menu"
        variants={menuVariants}
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
      >
        <div className="p-8 pt-20">
          {/* Main Navigation */}
          <nav className="space-y-6 mb-12">
            <Link href="/" legacyBehavior>
              <motion.a
                className="block text-xl font-medium text-white hover:text-primary"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
              >
                Home
              </motion.a>
            </Link>
            <Link href="/projects" legacyBehavior>
              <motion.a
                className="block text-xl font-medium text-white hover:text-primary"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
              >
                Project
              </motion.a>
            </Link>
            <Link href="/certificate" legacyBehavior>
              <motion.a
                className="block text-xl font-medium text-white hover:text-primary"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
              >
                Certificate
              </motion.a>
            </Link>
          </nav>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-white hover:text-primary"
              whileHover={{ x: 10 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://gitlab.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-medium text-white hover:text-primary"
              whileHover={{ x: 10 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
            >
              GitLab
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;