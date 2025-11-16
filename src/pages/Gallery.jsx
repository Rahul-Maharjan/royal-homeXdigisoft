import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ButtonPrimary from "../components/ButtonPrimary";
import { motion } from "framer-motion";

import heroImg from "../assets/hero.webp";

// Room images
import r1 from "../assets/rooms/1.jpg";
import r2 from "../assets/rooms/2.jpg";
import r3 from "../assets/rooms/3.jpg";
import r4 from "../assets/rooms/4.jpg";
import r5 from "../assets/rooms/5.jpg";
import r6 from "../assets/rooms/6.jpg";

// Pool and hall images
import p1 from "../assets/pool/1.jpg";
import p2 from "../assets/pool/2.jpg";
import p3 from "../assets/pool/3.jpg";
import h1 from "../assets/hall/1.jpg";
import h2 from "../assets/hall/2.jpg";
import h3 from "../assets/hall/3.jpg";

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  const images = [r1, r2, r3, r4, r5, r6, p1, p2, p3, h1, h2, h3];

  return (
    <>
      <Navbar />

      {/* Hero - inspired by Home's visual style */}
      <section
        className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="relative z-10 text-center px-6"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-8 inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-light">
              Gallery
            </h2>
            <p className="text-white/90 mt-4 max-w-[760px]">
              Explore our curated collection of rooms, pool area, and event
              spaces — styled and photographed to inspire your stay.
            </p>
            <div className="mt-6">
              <ButtonPrimary label="VIEW HOTEL DETAILS" href="/RoyalHomes" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery grid */}
      <main className="bg-white py-16">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="mb-8 text-center">
            <p className="text-sm text-[#b2925a] uppercase tracking-wider font-semibold">
              Visual Tour
            </p>
            <h3 className="text-3xl md:text-4xl font-serif text-[#111] mt-2">
              Design Inspiration
            </h3>
            <p className="text-[#666] mt-3 max-w-[820px] mx-auto">
              A selection of our beautiful spaces — tap any image to view it
              larger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-50"
                onClick={() => setSelected(src)}
              >
                <img
                  src={src}
                  alt={`gallery-${idx + 1}`}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setSelected(null)}
            aria-label="Close preview"
          >
            ×
          </button>

          <div className="max-w-[90%] max-h-[90%]">
            <img
              src={selected}
              alt="preview"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;
