import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ButtonPrimary from "../components/ButtonPrimary";
import { motion } from "framer-motion";

import heroImg from "../assets/hero.webp";
import slogo from "../assets/slogo.png";

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

  const rooms = [r1, r2, r3, r4, r5, r6];
  const pools = [p1, p2, p3];
  const halls = [h1, h2, h3];

  return (
    <>
      <Navbar />

      {/* Hero section styled like Services / RoyalHomes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div
          className="relative h-[420px] md:h-[520px] flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(11,45,30,0.58), rgba(255,255,255,0.04)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0" style={{ mixBlendMode: "overlay" }} />

          <div className="relative z-10 text-center px-6">
            <h1
              className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-white"
              style={{
                textShadow:
                  "0 6px 20px rgba(11,45,30,0.35), 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              Gallery
            </h1>
            <p className="mt-3 text-sm md:text-lg text-[#f4e8cf]/95">
              Design inspiration — curated rooms, pool and event spaces.
            </p>

            <div
              className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full"
            >
              <ButtonPrimary label="VIEW HOTEL DETAILS" href="/RoyalHomes" />
            </div>
          </div>

          {/* curved bottom */}
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,40 C200,120 400,0 720,40 C1040,80 1240,20 1440,60 L1440,100 L0,100 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <div className="absolute z-20 text-left left-16 -mt-72 hidden md:block">
          <img src={slogo} alt="brand" />
        </div>
      </motion.section>

      <main>
        <div className="max-w-[1300px] mx-auto px-6 py-16">
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

          {/* Rooms Section */}
          <section className="mb-12">
            <h4 className="text-2xl font-serif text-[#111] mb-6">Rooms</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rooms.map((src, idx) => (
                <motion.div
                  key={`room-${idx}`}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-50"
                  onClick={() => setSelected(src)}
                >
                  <img
                    src={src}
                    alt={`room-${idx + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Pool Section */}
          <section className="mb-12">
            <h4 className="text-2xl font-serif text-[#111] mb-6">Pool & Leisure</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pools.map((src, idx) => (
                <motion.div
                  key={`pool-${idx}`}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-50"
                  onClick={() => setSelected(src)}
                >
                  <img
                    src={src}
                    alt={`pool-${idx + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Hall / Events Section */}
          <section>
            <h4 className="text-2xl font-serif text-[#111] mb-6">Event Spaces</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {halls.map((src, idx) => (
                <motion.div
                  key={`hall-${idx}`}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-50"
                  onClick={() => setSelected(src)}
                >
                  <img
                    src={src}
                    alt={`hall-${idx + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </section>
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
