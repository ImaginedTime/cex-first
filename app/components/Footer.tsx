'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 text-center relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold mb-4 text-gray-300"
      >
        C-Extension First Floor, RP Hall
      </motion.p>
      <motion.p
        className="text-xl text-[#f79a24] mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        "I'll be back" - The Terminator
      </motion.p>
      <div className="flex justify-center gap-4">
        <motion.a
          href="#"
          className="w-10 h-10 rounded-md bg-[#f79a24] flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">💬</span>
        </motion.a>
        <motion.a
          href="#"
          className="w-10 h-10 rounded-md bg-[#f79a24] flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">📷</span>
        </motion.a>
        <motion.a
          href="#"
          className="w-10 h-10 rounded-md bg-[#f79a24] flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-xl">🎵</span>
        </motion.a>
      </div>
    </footer>
  );
} 