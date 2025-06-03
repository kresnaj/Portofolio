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
        className="fixed top-0 right-0 h-full w-80 bg-dark z-40 navbar-menu"
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
            <Link href="/experiences" legacyBehavior>
              <motion.a
                className="block text-xl font-medium text-white hover:text-primary"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
              >
                Experience
              </motion.a>
            </Link>
          </nav>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.a
              href="https://github.com/kresnaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-light text-white hover:text-primary outline-none flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.2-1.8-1.2-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.1-3.2-.1-.3-.5-1.5.1-3.2 0 0 .9-.3 3 1.1.9-.2 1.8-.3 2.8-.3s1.9.1 2.8.3c2.1-1.4 3-1.1 3-1.1.6 1.7.2 2.9.1 3.2.7.8 1.1 1.9 1.1 3.2 0 4.6-2.8 5.6-5.4 5.9.4.3.7.9.7 1.9v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/>
              </svg>
              GitHub
            </motion.a>
            <motion.a
              href="https://gitlab.com/kresnaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-light text-white hover:text-primary outline-none flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
              </svg>
              GitLab
            </motion.a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;