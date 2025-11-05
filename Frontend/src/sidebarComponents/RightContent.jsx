import { useState } from "react";
import { motion } from "framer-motion";

// Dummy story data
const stories = [
  { id: 1, username: "sujal_pand...", img: "https://via.placeholder.com/60" },
  { id: 2, username: "dinki_mad...", img: "https://via.placeholder.com/60" },
  { id: 3, username: "satija_bha...", img: "https://via.placeholder.com/60" },
  { id: 4, username: "bhumiu_pa...", img: "https://via.placeholder.com/60" },
  { id: 5, username: "_saini_boy...", img: "https://via.placeholder.com/60" },
  { id: 6, username: "amit6432", img: "https://via.placeholder.com/60" },
];

export default function InstagramStories() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="w-full border-b pb-3 overflow-x-auto flex gap-4 p-4 no-scrollbar">
      {stories.map((story) => (
        <motion.div
          key={story.id}
          onClick={() => setActiveStory(story)}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <img
              src={story.img}
              alt={story.username}
              className="w-14 h-14 rounded-full border-2 border-white object-cover"
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{story.username}</p>
        </motion.div>
      ))}

      {activeStory && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="w-[350px] h-[600px] bg-black relative flex items-center justify-center">
            <img
              src={activeStory.img}
              alt="story"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setActiveStory(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* CSS for hiding scroll bar */
/* Add this inside your global CSS if not using Tailwind plugin */
// .no-scrollbar::-webkit-scrollbar { display: none; }
// .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }