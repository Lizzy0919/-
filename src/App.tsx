/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sun, Flower, Music, Music2, Send } from 'lucide-react';

interface Blessing {
  id: number;
  text: string;
  name: string;
  time: string;
}

const PRESET_BLESSINGS = [
  "祝老师身体健康，笑口常开！",
  "愿老师平安喜乐，万事如意。",
  "恩师难忘，祝您桃李满天下，福气满满。"
];

export default function App() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [count, setCount] = useState(0);
  const [showEffect, setShowEffect] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initial mock data
    const initial = PRESET_BLESSINGS.map((text, i) => ({
      id: Date.now() + i,
      text,
      name: "学生",
      time: new Date().toLocaleTimeString()
    }));
    setBlessings(initial);
  }, []);

  const handleBless = () => {
    setCount(prev => prev + 1);
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now(),
      text: inputText,
      name: inputName || "热心学生",
      time: new Date().toLocaleTimeString()
    };

    setBlessings([newBlessing, ...blessings]);
    setInputText('');
    setInputName('');
    handleBless();
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 font-serif overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0">
        <div className="absolute top-10 left-10 animate-pulse"><Sun size={100} color="#ffd700" /></div>
        <div className="absolute bottom-10 right-10 animate-bounce"><Flower size={100} color="#cc0000" /></div>
      </div>

      {/* Header Section */}
      <header className="text-center mb-8 z-10">
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl md:text-7xl font-bold text-red-700 mb-4 sparkle-text"
        >
          祝老师身体健康
        </motion.h1>
        <p className="text-2xl text-red-600 font-bold">早日康复 · 万事如意 · 平安喜乐</p>
      </header>

      {/* Main Blessing Button */}
      <div className="relative mb-12 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBless}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-600 border-8 border-gold flex flex-col items-center justify-center text-gold shadow-2xl cursor-pointer elderly-card"
        >
          <Heart size={60} fill="currentColor" className="mb-2" />
          <span className="text-3xl font-black">点我祈福</span>
          <span className="text-xl mt-2">已祈福 {count} 次</span>
        </motion.button>

        <AnimatePresence>
          {showEffect && (
            <motion.div
              initial={{ y: 0, opacity: 1, scale: 0.5 }}
              animate={{ y: -200, opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 font-bold text-4xl pointer-events-none whitespace-nowrap"
            >
              早日康复！
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Input Form */}
      <section className="w-full max-w-2xl bg-white p-6 rounded-2xl border-4 border-red-600 shadow-xl mb-12 z-10">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center border-b-2 border-red-100 pb-2">
          留下您的真心祝福
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xl font-bold text-red-600 mb-1">您的姓名：</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="例如：张三"
              className="w-full p-3 text-xl border-2 border-red-200 rounded-lg focus:border-red-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xl font-bold text-red-600 mb-1">祝福语：</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="写下对老师的祝福..."
              className="w-full p-3 text-xl border-2 border-red-200 rounded-lg focus:border-red-500 outline-none h-32"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-gold text-2xl font-bold py-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send /> 提交祝福
          </button>
        </form>
      </section>

      {/* Blessing List */}
      <section className="w-full max-w-4xl z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold text-red-800">祝福墙</h2>
          <div className="bg-gold text-red-800 px-4 py-1 rounded-full font-bold">
            共 {blessings.length} 条祝福
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {blessings.map((b) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 p-6 rounded-xl border-l-8 border-red-600 shadow-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 opacity-10">
                  <Flower size={60} />
                </div>
                <p className="text-2xl text-red-900 font-bold mb-3 italic">“{b.text}”</p>
                <div className="flex justify-between items-center text-red-700 font-bold">
                  <span>—— {b.name}</span>
                  <span className="text-sm opacity-70">{b.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-red-800 font-bold pb-10 z-10">
        <p className="text-xl">© 2026 恩师安康祈福委员会</p>
        <p className="mt-2">祝全天下老师身体健康，万事如意！</p>
      </footer>

      {/* Floating Music Toggle (Classic elderly app feature) */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gold rounded-full flex items-center justify-center text-red-700 shadow-lg z-50 animate-spin-slow"
        style={{ animationDuration: '5s' }}
      >
        {isPlaying ? <Music2 /> : <Music />}
      </button>
      
      {/* Hidden Audio element for "Atmosphere" */}
      <audio 
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder classical music
      />
      
      {/* Effect for playing music */}
      {useEffect(() => {
        if (isPlaying) {
          audioRef.current?.play().catch(() => setIsPlaying(false));
        } else {
          audioRef.current?.pause();
        }
      }, [isPlaying])}
    </div>
  );
}
