import React, { useState, useEffect, useRef } from "react";
import { MapPin, Star, Share2, Check, Phone, Mail, Map } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import gallery1 from "../assets/rooms/7.jpg";
import gallery2 from "../assets/rooms/6.jpg";
import gallery3 from "../assets/rooms/3.jpg";
import gallery4 from "../assets/rooms/4.jpg";
import gallery5 from "../assets/rooms/5.jpg";
import gallery6 from "../assets/rooms/2.jpg";
import gallery7 from "../assets/rooms/1.jpg";

import icon12 from "../assets/rooms/icon-12.png";
import icon13 from "../assets/rooms/icon-13.png";
import icon14 from "../assets/rooms/icon-14.png";
import icon15 from "../assets/rooms/icon-15.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import hero from "../assets/rooms/6.jpg";
import twin from "../assets/rooms/7.jpg";
import duplex from "../assets/rooms/5.jpg";
import slogo from "../assets/slogo.png";

const ROOMS = {
  MASTER_BED: {
    title: "Master Bed",
    reviews: 112,
    rating: 4.9,
    location: "Tanahun",
    icons: [
      { icon: icon12, label: "3 Guests" },
      { icon: icon13, label: "1 Children" },
      { icon: icon14, label: "55 m²" },
      { icon: icon15, label: "1 King Bed" },
    ],
    heroImage: hero,
    description: `Our luxurious Master Bed rooms offer a spacious retreat with an elegant interior, premium king-sized bed, and a beautiful Tanahun valley view. Perfect for families or couples seeking comfort and privacy.`,
    rules: [
      "Check-in time: From 3:00 PM",
      "Check-out time: By 11:00 AM",
      "Early check-in/late check-out subject to availability.",
      "All rooms are non-smoking.",
      "Daily housekeeping included.",
    ],
    amenities: [
      "Free Wi-Fi",
      "Smart TV",
      "Swimming Pool",
      "Fitness Center",
      "King Size Bed",
      "Shower + Bathtub",
      "Airport Transport",
    ],
    gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
  },

  DELUXE_BED: {
    title: "Deluxe Bed",
    reviews: 56,
    rating: 4.8,
    location: "Tanahun",
    icons: [
      { icon: icon12, label: "2 Guests" },
      { icon: icon13, label: "1 Children" },
      { icon: icon14, label: "40 m²" },
      { icon: icon15, label: "2 Beds" },
    ],
    heroImage: duplex,
    description: `Deluxe Bed rooms feature premium bedding, a relaxing Tanahun hillside view, and elegant interiors. Perfect for guests who want comfort with modern amenities.`,
    rules: [
      "Check-in: From 3:00 PM",
      "Check-out: By 11:00 AM",
      "Non-smoking room.",
      "Daily housekeeping provided.",
      "Extra requests available on booking.",
    ],
    amenities: [
      "Free Wi-Fi",
      "Smart TV",
      "Swimming Pool",
      "Fitness Center",
      "Queen Size Bed",
      "Shower",
      "Refrigerator",
      "Airport Transport",
    ],
    gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
  },

  TWIN_BED: {
    title: "Twin Bed",
    reviews: 38,
    rating: 4.6,
    location: "Tanahun",
    icons: [
      { icon: icon12, label: "2 Guests" },
      { icon: icon13, label: "0 Children" },
      { icon: icon14, label: "35 m²" },
      { icon: icon15, label: "2 Single Beds" },
    ],
    heroImage: twin,
    description: `Twin Bed rooms are ideal for friends, colleagues, or solo travelers. Featuring two comfortable single beds and a peaceful view, it’s a perfect blend of comfort and convenience.`,
    rules: [
      "Check-in: From 3:00 PM",
      "Check-out: 11:00 AM",
      "Non-smoking room.",
      "Daily housekeeping included.",
      "Extra amenities on request.",
    ],
    amenities: [
      "Free Wi-Fi",
      "Smart TV",
      "Working Desk",
      "24/7 Support",
      "Shower",
      "Refrigerator",
      "Laundry Service",
    ],
    gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7],
  },
};

export default function RoomDetails() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    rooms: "1",
    adults: "2",
    children: "0",
    extras: { clean: false, parking: false, breakfast: false, dinner: false },
  });

  // selected room: default to MASTER_BED for immediate display
  const [selectedRoomKey, setSelectedRoomKey] = useState("MASTER_BED");
  const room = ROOMS[selectedRoomKey];

  // On mount: read `room` from URL (supports both normal query and hash-based routing)
  useEffect(() => {
    const parseRoomFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      let key = params.get("room");

      if (!key) {
        const hash = window.location.hash || "";
        const qIndex = hash.indexOf("?");
        if (qIndex !== -1) {
          const hashQuery = hash.substring(qIndex + 1);
          const hp = new URLSearchParams(hashQuery);
          key = hp.get("room");
        }
      }

      if (key && ROOMS[key]) {
        setSelectedRoomKey(key);
      }
    };

    // parse once on mount
    parseRoomFromUrl();

    // listen for navigation changes (navbar anchor clicks will trigger these)
    window.addEventListener("hashchange", parseRoomFromUrl);
    window.addEventListener("popstate", parseRoomFromUrl);

    return () => {
      window.removeEventListener("hashchange", parseRoomFromUrl);
      window.removeEventListener("popstate", parseRoomFromUrl);
    };
  }, []);

  // Keep URL in sync when user switches room (no reload)
  useEffect(() => {
    const key = selectedRoomKey;
    const hash = window.location.hash || "";
    if (hash && hash.startsWith("#/")) {
      // Keep path to RoomDetails; replace or append query
      const base = hash.split("?")[0] || "#/RoomDetails";
      const newHash = `${base.split("#/")[1] ? `#/${base.split("#/")[1].split('?')[0]}` : '#/RoomDetails'}?room=${key}`;
      window.history.replaceState(null, "", newHash);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.set("room", key);
      window.history.replaceState(null, "", url.toString());
    }
  }, [selectedRoomKey]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith("extra_")) {
      const key = name.replace("extra_", "");
      setForm((prev) => ({
        ...prev,
        extras: { ...prev.extras, [key]: checked },
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut) {
      alert("Please choose both check-in and check-out dates.");
      return;
    }
    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      alert("Check-out must be after check-in.");
      return;
    }
    alert(`Available ${room.title} from ${form.checkIn} to ${form.checkOut}.`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const bookingRef = useRef(null);
  const galleryRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When gallery becomes visible, release the sticky booking card
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const el = galleryRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <>
      <Navbar />

      {/* Page background gradient wrapper */}
      <div
        className="min-h-screen bg-[#F9F7F3]"
        style={{
          background:
            "linear-gradient(180deg, rgba(249,247,243,0.9) 0%, rgba(249,247,243,0.95) 40%, rgba(243,241,236,1) 100%)",
        }}
      >
        {/* Curved Hero */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative overflow-hidden"
        >
          <div
            className="relative h-[420px] md:h-[520px] flex items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(11,45,30,0.58), rgba(255,255,255,0.04)), url(${room.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ mixBlendMode: "overlay" }}
            />

            <div className="relative z-10 text-center px-6">
              <h1
                className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-white"
                style={{
                  textShadow:
                    "0 6px 20px rgba(11,45,30,0.35), 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                {room.title}
              </h1>
              <p className="mt-3 text-sm md:text-lg text-[#f4e8cf]/95">
                Luxurious Accommodation Experience — {room.location}
              </p>

              <div
                className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2 text-sm text-[#f6e7b3]">
                  <Star size={14} />
                  <span className="font-medium">{room.rating}</span>
                  <span className="text-white/80">·</span>
                  <span>{room.reviews} reviews</span>
                </div>
              </div>
            </div>

            {/* soft curved bottom */}
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0,40 C200,120 400,0 720,40 C1040,80 1240,20 1440,60 L1440,100 L0,100 Z"
                fill="#F9F7F3"
              />
            </svg>
          </div>
        </motion.section>
        <div className="absolute z-10 text-left left-16 -mt-72">
          <img src={slogo} alt="abcd" />
        </div>

        {/* Main content container (slightly pulled up to overlap hero curve) */}
        <main className="max-w-7xl mx-auto px-6 md:px-8 -mt-6 md:-mt-10  relative z-10">
          {/* Room selector (switch between room types without loading) */}
          {/* <div className="mb-6 flex flex-wrap items-center gap-3">
            {Object.keys(ROOMS).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedRoomKey(key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 ${
                  selectedRoomKey === key
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-white border border-gray-100'
                }`}
              >
                {ROOMS[key].title}
              </button>
            ))}
          </div> */}

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-sm p-6 md:p-10">
            {/* LEFT: content (no border, glassy look, layered) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-2 space-y-8"
            >
              {/* Info badges row */}
              <div className="flex flex-wrap items-center gap-3 mt-6 md:mt-8">
                {room.icons.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl px-4 py-2 shadow-sm"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    <img
                      src={it.icon}
                      alt={it.label}
                      className="w-8 h-6 object-contain"
                    />
                    <span className="text-sm font-medium text-[#1B4332]">
                      {it.label}
                    </span>
                  </div>
                ))}
                <button
                  className="ml-auto inline-flex items-center gap-2 text-sm rounded-full px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 4px 12px rgba(16,24,32,0.04)",
                  }}
                  aria-label="share"
                >
                  <Share2 size={14} />
                  Share
                </button>
              </div>

              {/* Glass content block (no hard border lines; soft shadows & blur) */}
              <div
                className="rounded-sm p-6 md:p-8"
                style={{
                  background: "rgba(255,255,255,0.62)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 10px 30px rgba(11,45,30,0.05)",
                }}
              >
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-semibold text-[#1B4332] mb-3">
                    Room Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {room.description}
                  </p>

                  {/* Small location highlight (soft moss background + gold dot) */}
                  <div
                    className="mt-4 inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full"
                    style={{
                      background: "rgba(163,177,138,0.12)",
                      color: "#1B4332",
                    }}
                  >
                    <MapPin size={14} />
                    <span className="font-medium">
                      Prime location · {room.location}
                    </span>
                  </div>
                </div>

                {/* Amenities grid (floating minimal cards) */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#1B4332] mb-4">
                    Services & Amenities
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {room.amenities.map((a, i) => (
                      <motion.div
                        key={i}
                        whileHover={{
                          y: -6,
                          boxShadow: "0 20px 40px rgba(11,45,30,0.06)",
                        }}
                        className="flex items-center gap-3 rounded-sm p-3"
                        style={{
                          background: "rgba(255,255,255,0.92)",
                          boxShadow: "0 6px 18px rgba(16,24,32,0.03)",
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-sm"
                          style={{
                            background: "rgba(163,177,138,0.10)",
                            borderRadius: 8,
                          }}
                        >
                          <Check size={14} className="text-[#1B4332]" />
                        </div>
                        <span className="text-sm text-gray-700">{a}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Rules (clean stacked blocks, no borders) */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#1B4332] mb-4">
                    Room Rules
                  </h4>
                  <div className="space-y-3">
                    {room.rules.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-sm"
                        style={{
                          background:
                            i % 2 === 0
                              ? "rgba(255,255,255,0.75)"
                              : "rgba(255,255,255,0.85)",
                          boxShadow: "0 6px 16px rgba(16,24,32,0.02)",
                        }}
                      >
                        <div className="mt-1 text-amber-500">•</div>
                        <p className="text-sm text-gray-700">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: booking & contact (glassy card with subtle glow accent) */}
            <motion.aside
              ref={bookingRef}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`space-y-6 ${
                isSticky ? "sticky top-28" : "relative"
              } transition-all duration-300`}
            >
              <div style={{ position: "relative", minHeight: "600px" }}>
                {/* Booking Card (fixed on scroll) */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.78))",
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 12px 30px rgba(11,45,30,0.06)",
                  }}
                >
                  <h3 className="text-xl font-serif font-semibold text-[#1B4332] text-center mb-4">
                    Check Your Room
                  </h3>

                  <form onSubmit={validateAndSubmit} className="space-y-3">
                    {["checkIn", "checkOut"].map((field) => (
                      <div key={field}>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          {field === "checkIn"
                            ? "Check-In Date"
                            : "Check-Out Date"}
                        </label>
                        <input
                          type="date"
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                          style={{
                            border: "1px solid rgba(16,24,32,0.06)",
                            background: "rgba(255,255,255,0.9)",
                            boxShadow: "inset 0 1px 2px rgba(16,24,32,0.02)",
                          }}
                        />
                      </div>
                    ))}

                    {[
                      {
                        name: "rooms",
                        label: "Rooms",
                        options: ["1", "2", "3"],
                      },
                      {
                        name: "adults",
                        label: "Adults",
                        options: ["1", "2", "3", "4"],
                      },
                      {
                        name: "children",
                        label: "Children",
                        options: ["0", "1", "2", "3"],
                      },
                    ].map((item) => (
                      <div key={item.name}>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          {item.label}
                        </label>
                        <select
                          name={item.name}
                          value={form[item.name]}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none"
                          style={{
                            border: "1px solid rgba(16,24,32,0.06)",
                            background: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {item.options.map((o) => (
                            <option key={o} value={o}>
                              {o} {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}

                    <div className="pt-3">
                      <h4 className="text-sm font-semibold text-[#1B4332] mb-2 flex items-center gap-2">
                        <Check size={16} /> Extra Services
                      </h4>

                      {[
                        {
                          key: "clean",
                          label: "Room Clean",
                          price: "Rs. 1500 /Night",
                        },
                        { key: "parking", label: "Parking", price: "Free" },
                        {
                          key: "breakfast",
                          label: "Breakfast",
                          price: "Rs. 250 /Total",
                        },
                        {
                          key: "dinner",
                          label: "Dinner",
                          price: "Rs. 500 /Day",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between py-2 text-sm text-gray-700"
                        >
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name={`extra_${item.key}`}
                              checked={!!form.extras[item.key]}
                              onChange={handleChange}
                              className="accent-[#1B4332]"
                            />
                            <span>{item.label}</span>
                          </label>
                          <span className="text-[#1B4332] font-medium">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full py-3 mt-2 font-medium tracking-wide text-white"
                      style={{
                        background: "#e5c413",
                        boxShadow: "0 10px 30px rgba(163,177,138,0.12)",
                      }}
                    >
                      Check Availability →
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 10px 30px rgba(11,45,30,0.04)",
                }}
              >
                <h4 className="font-serif text-lg font-semibold text-[#1B4332] text-center mb-3">
                  For Reservation
                </h4>

                <div className="text-gray-700 text-base mb-3 space-y-3 px-6">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#1B4332]" />
                    <span className="font-medium">+977-9806767979</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-[#1B4332]" />
                    <span className="font-medium">
                      info@royalshomeresort.com.np
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Map size={18} className="text-[#1B4332]" />
                    <span className="font-medium">
                      ROYALS HOME, Anboo Khaireni, Tanahun
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 text-center pt-3 text-xs text-gray-500">
                  <p>Need urgent help? Our support team is available 24/7.</p>
                </div>
              </div>
            </motion.aside>
          </section>
        </main>

        {/* Full-width Room Gallery */}
        <section className="w-full bg-[#F9F7F3] px-6 md:px-8 py-9 pb-20">
          <div className="max-w-7xl mx-auto mb-10 text-center">
            <h4 className="text-3xl md:text-4xl font-serif font-semibold text-[#1B4332] mb-3 tracking-tight">
              Room Gallery
            </h4>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              A glimpse inside the{" "}
              <span className="font-semibold text-[#1B4332]">{room.title}</span>
              , warm tones, natural textures, and peaceful ambience to elevate
              your stay.
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[150px]">
            {room.gallery.concat(room.gallery).map((g, idx) => {
              // Assign different spans for variety (vertical / horizontal)
              const rowSpan = idx % 5 === 0 ? 2 : idx % 3 === 0 ? 1 : 2;
              const colSpan = idx % 4 === 0 ? 2 : 1;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, zIndex: 50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`overflow-hidden relative`}
                  style={{
                    gridRowEnd: `span ${rowSpan}`,
                    gridColumnEnd: `span ${colSpan}`,
                  }}
                >
                  <img
                    src={g}
                    alt={`gallery-${idx}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Optional text overlay */}
                  <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {room.title} View {idx + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
