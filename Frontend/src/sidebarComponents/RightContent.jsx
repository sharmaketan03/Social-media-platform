import { useState } from "react";
import { motion } from "framer-motion";

const stories = [
  { id: 1, username: "sujal_pand...", img: "https://via.placeholder.com/150" },
  { id: 2, username: "dinki_mad...", img: "https://via.placeholder.com/150" },
  { id: 3, username: "satija_bha...", img: "https://via.placeholder.com/150" },
  { id: 4, username: "bhumiu_pa...", img: "https://via.placeholder.com/150" },
  { id: 5, username: "_saini_boy...", img: "https://via.placeholder.com/150" },
  { id: 6, username: "amit6432", img: "https://via.placeholder.com/150" },
];

export default function RightContent() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="w-full min-h-screen bg-white p-4">
      {/* Stories */}
      <div className="flex gap-4 overflow-x-auto pb-4 border-b border-gray-200 no-scrollbar">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            onClick={() => setActiveStory(story)}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <img
                src={story.img}
                alt={story.username}
                className="w-16 h-16 rounded-full border-2 border-white object-cover"
              />
            </div>
            <p className="text-xs mt-1 text-gray-700">{story.username}</p>
          </motion.div>
        ))}
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-[380px] h-[650px] bg-black rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={activeStory.img}
              alt="story"
              className="w-full h-full object-cover"
            />
            <button
              className="absolute top-3 right-3 text-white text-2xl font-bold"
              onClick={() => setActiveStory(null)}
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
