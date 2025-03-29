'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ActivitiesSection() {
  // Array of all room numbers
  const rooms = [
    { number: 'Cex-Utility', title: 'Store Room', emoji: '🛠️' },
    { number: 'C-241', title: 'Closed', emoji: '🔒' },
    { number: 'C-242', title: 'Folded Cake', emoji: '⚠️' },
    { number: 'C-243', title: 'Ganja Gun', emoji: '🔫' },
    { number: 'C-244', title: 'Flip Tables', emoji: '🪑' },
    { number: 'C-245', title: 'Diddy\'s Basement', emoji: '👶' },
    { number: 'C-246', title: 'Chut-Paglus', emoji: '🍑' },
    { number: 'C-247', title: 'Inka Pta Nhi', emoji: '😵' },
    { number: 'C-248', title: 'Bengalies', emoji: '🐠' }
  ];

  return (
    <section id="activities" className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-6xl font-bold mb-16 text-center text-[#f79a24]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Room Guide
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {/* Room Cards */}
          {rooms.map((room) => (
            <motion.div
              key={room.number}
              className="bg-gradient-to-br from-orange-900/30 to-black/30 backdrop-blur-md rounded-md p-6 border border-[#f79a24]/30 transform transition duration-300 hover:scale-105"
              whileHover={{ y: -10 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="h-12 w-12 bg-gradient-to-br from-[#f79a24] to-orange-600 rounded-md flex items-center justify-center">
                  <span className="text-2xl">{room.emoji}</span>
                </div>
                <span className="bg-black px-3 py-1 rounded-full text-[#f79a24] font-mono font-bold border border-[#f79a24]/50">
                  {room.number}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-orange-400">{room.title}</h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#f79a24] to-transparent rounded-full mb-4"></div>
              <p className="text-gray-400">
                {/* Visit {room.number} for an epic {room.title.toLowerCase()} experience you won't forget! */}
                Pta nhi, time nhi mila to likha nhi, khud dekhlo
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Venue Map Section */}
          <motion.div
            className="text-center bg-black/50 backdrop-blur-sm p-8 rounded-md border border-[#f79a24]/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#f79a24]">
              Venue Highlights
            </h3>
            <ul className="text-2xl space-y-4">
              <motion.li
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-300"
              >
                ✨ C-Extension, First Floor
              </motion.li>
              <motion.li
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-300"
              >
                🎭 9 Rooms of Epic Entertainment
              </motion.li>
              <motion.li
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-300"
              >
                🎨 Each Room with Unique Theme
              </motion.li>
              <motion.li
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-gray-300"
              >
                🎪 Follow Corridor Signs for Navigation
              </motion.li>
            </ul>
          </motion.div>
          
          {/* Featured Image */}
          <motion.div
            className="relative h-96 w-full overflow-hidden rounded-md border-2 border-[#f79a24] shadow-lg shadow-[#f79a24]/50"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/Cex First.png"
              alt="CEX First Venue Map"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
              <span className="text-xl font-bold text-[#f79a24] bg-black/50 px-4 py-2 rounded-md backdrop-blur-sm">
                Cex People
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 