'use client';

import { motion } from 'framer-motion';
import { CookieIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-center p-12 bg-gray-900 rounded-3xl shadow-2xl relative overflow-hidden border border-gray-700"
      >
        <SparklesIcon className="absolute top-4 left-4 text-yellow-400 animate-pulse" size={32} />
        <SparklesIcon className="absolute bottom-4 right-4 text-pink-400 animate-pulse" size={32} />

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 mb-4">
          Prepare for Sweet Pandemonium!
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-300 leading-relaxed">
          Where cakes defy gravity and cookies whisper secrets. <br />
          Your taste buds are about to embark on a flavor adventure!
        </p>

        <div className="mt-8 flex items-center justify-center space-x-4">
          <CookieIcon className="text-yellow-500 animate-bounce" size={32} />
          <p className="text-lg text-gray-400 italic">
            (Yes, we&#39;ve smuggled in some cookies too...shhh!)
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full shadow-md hover:shadow-xl transition duration-500"
          >
            Dive into Deliciousness!
          </Link>
        </div>

        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-600 rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600 rounded-full blur-2xl opacity-20"></div>
      </motion.div>
    </div>
  );
};

export default Home;
