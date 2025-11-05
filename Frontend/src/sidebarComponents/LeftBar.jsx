import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass, MessageSquare, User, Heart, Menu, LogOut } from "lucide-react";

export default function LeftBar() {
  const [openMore, setOpenMore] = useState(false);

  return (
    <div className="h-screen w-[300px] border-r flex flex-col px-4 py-4 bg-white">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 pl-2">Instagram</h1>

      {/* Menu */}
      <div className="flex flex-col gap-2 text-[15px] font-medium">
        <Link to="/home" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <Home className="w-6" /> Home
        </Link>

        <Link to="/home/search" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <Search className="w-6" /> Search
        </Link>

        <Link to="/home/explore" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <Compass className="w-6" /> Explore
        </Link>

        <Link to="/home/messages" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <MessageSquare className="w-6" /> Messages
        </Link>

        <Link to="/home/notifications" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <Heart className="w-6" /> Notifications
        </Link>

        <Link to="/home/profile" className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl">
          <User className="w-6" /> Profile
        </Link>
      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* More + Logout */}
      <div className="relative mb-3">
        <button 
          className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-xl w-full"
          onClick={() => setOpenMore(!openMore)}
        >
          <Menu className="w-6 " /> More
        </button>

        {openMore && (
          <div className="absolute bottom-12 left-0 bg-white shadow-xl border rounded-xl w-40 py-2">
            <button
              className="flex gap-3 items-center px-3 py-2 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                document.cookie = "token=; expires=Thu, 01 Jan 1970; path=/;";
                window.location.href = "/";
              }}
            >
              <LogOut className="w-5" /> Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
