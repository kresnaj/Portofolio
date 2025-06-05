'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';

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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setForm({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    // You can integrate with your preferred form handling service here
    alert('Message sent successfully!');
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black"
    >
      <div className="bg-dark rounded-t-[48px]"> 
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Side - Contact Info */}
              <motion.div className="contact-info space-y-8">
                {/* Header */}
                <div className="mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                    Get In Touch?
                  </h2>
                  <p className="text-gray-400 text-lg">
                    I&apos;m always open to discussing new opportunities, creative projects, 
                    or potential collaborations. Feel free to reach out!
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    {/* Email and Phone side by side */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <motion.div 
                        className="flex items-center space-x-4 rounded-xl"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                      >
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <p className="text-gray-400">jshkrsna@gmail.com</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-4 rounded-xl"
                        whileHover={{ x: 10 }}
                        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                      >
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <p className="text-gray-400">+62 856-07607060</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Location below */}
                    <motion.div 
                      className="flex items-center space-x-4 rounded-xl w-1/2"
                      whileHover={{ x: 10 }}
                      transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Location</p>
                        <p className="text-gray-400">Malang, Indonesia</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Contact Image - Updated positioning */}
                  <div className="relative w-[300px] h-[300px]"> {/* Fixed width and height */}
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
                <div className="border-2 border-primary bg-black rounded-xl p-8">
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
  );
};

export default ContactSection;