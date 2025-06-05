'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set initial state to prevent content from disappearing
    gsap.set(['.contact-header', '.contact-form', '.contact-info'], {
      opacity: 1,
      x: 0,
      y: 0
    });

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        once: true, // Animation plays only once
      }
    });

    // Simplified animations with reduced movement
    tl.fromTo('.contact-header',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.contact-form',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.contact-info',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Loading toast
    const loadingToast = toast.loading('Sending your message...');

    try {
      await emailjs.send(
        'service_jq67xnj',
        'template_ag36r4y',
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          email: form.email,
          message: form.message,
          to_name: 'Joshua',
          subject: `New Project Request from ${form.name}`,
        },
        'iuQB7gKsSSw1XhjYI'
      );

      // Reset form
      setForm({ name: '', email: '', message: '' });

      // Success notification
      toast.success(
        'Thank you! Your message has been sent successfully.', 
        {
          duration: 5000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #7c3aed',
          },
          icon: '🚀',
        }
      );
    } catch (error) {
      // Error notification
      toast.error(
        'Failed to send message. Please try again later.', 
        {
          duration: 5000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #ef4444',
          },
          icon: '❌',
        }
      );
      console.error('Error details:', error);
    } finally {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Container dengan posisi baru */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          // Default options
          style: {
            background: '#1a1a1a',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '90vw', // Responsive width
            width: '400px',   // Max width on desktop
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: '#7c3aed',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #7c3aed',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid #ef4444',
            },
          },
          // Animasi popup
          className: '',
        }}
      />

      <section
        ref={sectionRef}
        className="min-h-screen bg-black"
      >
        <div className="bg-dark rounded-t-[48px]"> 
          <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Contact Info */}
                <motion.div className="contact-info space-y-8">
                  {/* Header */}
                  <div className="mb-8 lg:mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                      Get In Touch?
                    </h2>
                    <p className="text-gray-400 text-base lg:text-lg">
                      I&apos;m always open to discussing new opportunities, creative projects, 
                      or potential collaborations. Feel free to reach out!
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-1">
                    {/* Baris pertama - Email dan Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                      <motion.div 
                        className="flex items-center space-x-4 rounded-xl p-2 lg:p-4"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm sm:text-base font-medium">Email</p>
                          <p className="text-gray-400 text-xs sm:text-sm">jshkrsna@gmail.com</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-4 rounded-xl p-2 lg:p-4"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm sm:text-base font-medium">Phone</p>
                          <p className="text-gray-400 text-xs sm:text-sm">+62 856-07607060</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Baris kedua - Location */}
                    <div className="w-full sm:w-1/2">
                      <motion.div 
                        className="flex items-center space-x-4 rounded-xl p-2 lg:p-4"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm sm:text-base font-medium">Location</p>
                          <p className="text-gray-400 text-xs sm:text-sm">Malang, Indonesia</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Contact Image */}
                    <div className="relative w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] mx-auto lg:mx-0">
                      <Image
                        src="/icons/rocket.png" 
                        alt="Contact Illustration"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Contact Form */}
                <motion.div className="contact-form">
                  <div className="border-2 border-primary bg-black rounded-xl p-6 lg:p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-800 focus:border-primary focus:outline-none transition-colors duration-300"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-800 focus:border-primary focus:outline-none transition-colors duration-300"
                          placeholder="your_email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={form.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-900 text-white rounded-lg border border-zinc-800 focus:border-primary focus:outline-none transition-colors duration-300 resize-none"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 ${
                          isSubmitting 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-primary hover:bg-purple-500 text-white'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;