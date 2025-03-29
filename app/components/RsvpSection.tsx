'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function RsvpSection() {
  const [formData, setFormData] = useState({ name: '', email: '', attendance: 'yes' });
  const [checkedItems, setCheckedItems] = useState({
    snacks: false,
    drinks: false,
    costume: false,
    games: false,
    friends: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checklist toggle
  const handleCheckToggle = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item as keyof typeof prev]
    }));
  };

  // Create confetti explosion
  const createConfetti = (container: HTMLElement) => {
    const confetti = document.createElement('div');
    const colors = ['#FF3366', '#36FF33', '#3366FF', '#F433FF', '#33FFF3'];
    
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.position = 'absolute';
    confetti.style.zIndex = '1000';
    confetti.style.borderRadius = '50%';
    confetti.style.top = '50%';
    confetti.style.left = '50%';
    
    container.appendChild(confetti);
    
    const angle = Math.random() * 360;
    const distance = Math.random() * 80 + 50;
    const x = distance * Math.cos(angle * Math.PI / 180);
    const y = distance * Math.sin(angle * Math.PI / 180);
    
    confetti.animate([
      { transform: 'translate(-50%, -50%) scale(0)' },
      { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)` }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(.17,.67,.83,.67)',
      fill: 'forwards'
    });
    
    setTimeout(() => {
      confetti.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 500,
        fill: 'forwards'
      });
      
      setTimeout(() => {
        confetti.remove();
      }, 500);
    }, 1000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create confetti explosion
    const container = document.getElementById('rsvp-container');
    if (container) {
      for (let i = 0; i < 100; i++) {
        createConfetti(container);
      }
    }
    
    // Reset form or show success message
    setTimeout(() => {
      alert('Thanks for your RSVP! Get ready to party!');
      setFormData({ name: '', email: '', attendance: 'yes' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="rsvp" className="min-h-screen flex items-center justify-center py-20 relative">
      <div id="rsvp-container" className="container mx-auto px-4 relative overflow-hidden">
        <motion.h2
          className="text-6xl font-bold mb-16 text-center text-[#f79a24]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          RSVP Now
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* RSVP Form */}
          <motion.div
            className="bg-gradient-to-br from-[#1a1a1a] to-black p-8 rounded-md border border-[#f79a24]/30 shadow-xl shadow-[#f79a24]/10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-[#f79a24]">
              "Be There or Be Square"
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Your Name</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Are You Coming?</label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-[#f79a24]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79a24] text-white"
                >
                  <option value="yes">Hell Yeah!</option>
                  <option value="maybe">Maybe (But Probably Yes)</option>
                  <option value="no">Sadly, No (But I'll Regret It)</option>
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#f79a24] rounded-md text-black font-bold text-lg transform transition-all disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Count Me In! 🎉'}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Meme Image */}
          <motion.div
            className="relative w-full h-80"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/meme1.png"
              alt="Party Meme"
              fill
              className="object-contain rounded-md"
            />
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#f79a24]/20 to-[#f79a24]/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
        
        {/* What to Bring Checklist */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-[#1a1a1a] to-black p-8 rounded-md border border-[#f79a24]/30 shadow-xl shadow-[#f79a24]/10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-[#f79a24]">
            What to Bring?
          </h3>
          
          <div className="space-y-4">
            {[
              { id: 'snacks', label: 'Snacks (because "mo snacks mo problems" - Notorious B.I.G, probably)' },
              { id: 'drinks', label: 'Drinks (I drink and I know things)' },
              { id: 'costume', label: 'Costume/Outfit (dress like your favorite character)' },
              { id: 'games', label: 'Games (Card games on motorcycles!)' },
              { id: 'friends', label: 'Friends (they\'ll be there for you 👏👏👏👏)' }
            ].map((item) => (
              <motion.div 
                key={item.id}
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all ${
                  checkedItems[item.id as keyof typeof checkedItems] 
                    ? 'bg-orange-900/30 border border-[#f79a24]/50'
                    : 'bg-black/30 border border-gray-700'
                }`}
                onClick={() => handleCheckToggle(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center mr-4 transition-all ${
                  checkedItems[item.id as keyof typeof checkedItems]
                    ? 'bg-[#f79a24] text-black'
                    : 'bg-black border border-gray-500'
                }`}>
                  {checkedItems[item.id as keyof typeof checkedItems] && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-sm"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <span className={`flex-1 ${
                  checkedItems[item.id as keyof typeof checkedItems]
                    ? 'line-through text-orange-400'
                    : 'text-gray-300'
                }`}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Fun Movie Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl font-bold text-[#f79a24]">
            "This isn't just a party, this is THE party."
          </p>
          <p className="text-lg text-gray-400 mt-2">
            *Insert 'Always Has Been' meme*
          </p>
        </motion.div>
      </div>
    </section>
  );
} 