'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  currentQuote: number;
  quotes: string[];
}

export default function Hero({ timeLeft, currentQuote, quotes }: HeroProps) {
  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative px-4">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
        className="text-center relative"
      >
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-[#f79a24]/20 to-[#f79a24]/10 blur-xl rounded-full"
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
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold relative">
          <span className="text-white">CEX</span><span className="text-black bg-[#f79a24] rounded-2xl px-2 mx-1 py-1">FIRST</span>
        </h1>
        <motion.div
          className="flex flex-col gap-2 mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
            Where Legends Unite
          </p>
          <p className="text-sm sm:text-base md:text-xl text-gray-400">
            "I am the one who knocks" - Breaking Bad
          </p>
          <p className="text-xs sm:text-sm md:text-lg text-orange-400">
            March 29th, 2025 • 7PM Onwards • The Gathering
          </p>
          
          {/* Countdown Timer */}
          <motion.div 
            className="flex justify-center gap-2 sm:gap-4 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINS', value: timeLeft.minutes },
              { label: 'SECS', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-gradient-to-r from-[#f79a24] via-[#f79a24cc] to-[#f79a24] rounded-md shadow-lg shadow-[#f79a24]/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-bold">{item.value}</span>
                </motion.div>
                <span className="text-[10px] sm:text-xs mt-1 text-gray-400">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Quote Carousel */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="h-8 mt-4 px-2"
        >
          <p className="text-sm sm:text-base md:text-lg italic text-orange-400">"{quotes[currentQuote]}"</p>
        </motion.div>
        
        <motion.div
          className="mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="bg-[#f79a24] text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-md text-sm sm:text-lg md:text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Join the Adventure
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Images */}
      {/* <motion.div
        className="absolute bottom-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-32 h-32">
          <Image
            src="/images/anime1.png"
            alt="Anime Character"
            fill
            className="object-cover rounded-md border-2 border-[#f79a24] shadow-lg shadow-[#f79a24]/50"
          />
        </div>
      </motion.div> */}

      {/* <motion.div
        className="absolute bottom-20 right-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="relative w-32 h-32">
          <Image
            src="/images/anime2.png"
            alt="Anime Character"
            fill
            className="object-cover rounded-md border-2 border-[#f79a24] shadow-lg shadow-[#f79a24]/50"
          />
        </div>
      </motion.div> */}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-5 sm:bottom-8 md:bottom-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full p-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full mx-auto" />
        </div>
      </motion.div>
    </section>
  );
} 