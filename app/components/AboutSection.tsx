'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-[#f79a24]/10 to-orange-400/10 blur-3xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 relative">
            <span className="text-[#f79a24]">The Ultimate</span> <span className="text-white block sm:inline">Gathering</span>
          </h2>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 font-bold text-gray-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            "I am not in danger, I am the danger"
          </motion.p>
          <motion.p
            className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 md:mb-12 text-orange-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Join us for an epic crossover event
          </motion.p>
          
          {/* Featured Image */}
          <motion.div
            className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] mx-auto mb-8 sm:mb-12"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/Cex First.png"
              alt="Featured"
              fill
              className="object-contain sm:object-cover rounded-md border-2 border-[#f79a24] shadow-lg shadow-[#f79a24]/50"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 70vw"
              priority
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-[#f79a24] p-4 sm:p-6 md:p-8 rounded-md shadow-lg shadow-[#f79a24]/50"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Be Part of the Story</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 