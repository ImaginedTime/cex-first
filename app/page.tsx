'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ActivitiesSection from './components/ActivitiesSection';
import RsvpSection from './components/RsvpSection';
import MessageWall from './components/MessageWall';
import Footer from './components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', attendance: 'yes' });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [checkedItems, setCheckedItems] = useState({
    snacks: false,
    drinks: false,
    costume: false,
    games: false,
    friends: false
  });
  
  // Calculate countdown to event
  useEffect(() => {
    const eventDate = new Date('2025-03-29T19:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
          minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
          seconds: Math.max(0, Math.floor((difference / 1000) % 60))
        });
      }
    };
    
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    
    return () => clearInterval(timer);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Generate stars for background (anime night sky effect)
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  const quotes = [
    "The night is darkest just before the dawn. - The Dark Knight",
    "Winter is coming... to party! - Game of Thrones",
    "That's what I do: I drink and I know things. - Tyrion Lannister",
    "El Psy Kongroo - Steins;Gate",
    "Plus Ultra! - My Hero Academia",
    "It's gonna be legen... wait for it... DARY! - Barney Stinson",
    "I'm not superstitious, but I am a little stitious. - Michael Scott",
    "Did I do thaaaat? - Steve Urkel",
    "How you doin'? - Joey Tribbiani",
    "This is the way. - The Mandalorian"
  ];

  // Add cursor confetti effect script
  useEffect(() => {
    const colors = ["#FF9900", "#FF7A00", "#FF6100", "#FF4800", "#FF3000"];
    const cursorTrail = document.getElementById("cursor-trail");
    
    if (cursorTrail) {
      document.addEventListener("mousemove", (e) => {
        const confetti = document.createElement("div");
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = e.clientX + "px";
        confetti.style.top = e.clientY + "px";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.position = "fixed";
        confetti.style.borderRadius = "50%";
        confetti.style.backgroundColor = color;
        confetti.style.transform = `scale(${Math.random()})`;
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";
        
        cursorTrail.appendChild(confetti);
        
        setTimeout(() => {
          confetti.style.transition = "all 0.5s ease-out";
          confetti.style.opacity = "0";
          confetti.style.transform = `scale(0) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`;
          
          setTimeout(() => {
            confetti.remove();
          }, 500);
        }, 100);
      });
    }
    
    return () => {
      document.removeEventListener("mousemove", () => {});
    };
  }, []);

  // Quote carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log('Form submitted:', formData);
    
    // Create confetti explosion
    const container = document.getElementById('rsvp-container');
    if (container) {
      for (let i = 0; i < 100; i++) {
        createConfetti(container);
      }
    }
    
    // Reset form or show success message
    alert('Thanks for your RSVP! Get ready to party!');
  };
  
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

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative" ref={containerRef}>
      {/* Background */}
      <Background />

      {/* Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Content */}
      <div className="relative z-10 pt-16">
        {/* Cursor confetti effect */}
        <div id="cursor-trail" className="fixed pointer-events-none z-50"></div>
        
        {/* Hero Section */}
        <Hero 
          timeLeft={timeLeft} 
          currentQuote={currentQuote} 
          quotes={quotes} 
        />

        {/* About Section */}
        <AboutSection />

        {/* Activities Section */}
        <ActivitiesSection />

        {/* RSVP Section */}
        {/* <RsvpSection /> */}

        {/* Messages Section */}
        <section id="messages" className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-6xl font-bold mb-16 text-center text-[#f79a24]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Leave Your Mark
            </motion.h2>
            
            <MessageWall />
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
