"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Generate random bubbles on the client to avoid SSR hydration mismatch
  const [bubbles, setBubbles] = useState<Array<{id: number, size: number, left: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    setBubbles(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20px to 80px
      left: Math.random() * 100, // 0% to 100%
      delay: Math.random() * 2, // 0s to 2s
      duration: Math.random() * 3 + 2, // 2s to 5s
    })));
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary-custom overflow-hidden"
          >
            {/* Bubbles */}
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ y: '100vh', opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: '-20vh', 
                  opacity: [0, 0.7, 0.7, 0],
                  scale: [0.5, 1, 1.2, 1]
                }}
                transition={{
                  duration: bubble.duration,
                  delay: bubble.delay,
                  ease: "easeOut",
                  repeat: Infinity
                }}
                className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                style={{
                  width: bubble.size,
                  height: bubble.size,
                  left: `${bubble.left}%`,
                  bottom: -100
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl">🏛️</span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tight">Civicmatch</h1>
              <p className="text-primary-foreground/80 font-medium tracking-wide mt-2">Connecting Citizens to Schemes</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main App Content */}
      <div className={showSplash ? 'hidden' : 'block'}>
        {children}
      </div>
    </>
  );
}
