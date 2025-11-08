// import { useState } from "react";
// import { Home, Search, Compass, MessageSquare, User, Heart, Menu, LogOut, PlusSquare } from "lucide-react";
// import { Link, NavLink } from "react-router-dom";

// export default function LeftBar() {
//   const [openMore, setOpenMore] = useState(false);
//   const [activeTab, setActiveTab] = useState("home");

//   const handleNavigation = (tab) => {
//     setActiveTab(tab);
//     // yahan navigation logic lagao (useNavigate ya Link se)
//   };

//   return (
//     <div className="h-screen w-[280px] border-r border-gray-200 flex flex-col px-4 py-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">

//       {/* Logo */}
//       <div className="mb-12 px-3">
//         <h1 className="text-[30px] font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
//           Instagram
//         </h1>
//       </div>

//       {/* Menu Items */}
//       <div className="flex flex-col gap-2 text-[16px]">
//         {/* Home */}
//         <NavLink to={"/home"}
//           onClick={() => handleNavigation("home")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "home"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <Home className="w-6 h-6" strokeWidth={activeTab === "home" ? 2.5 : 2} />
//           <span>Home</span>
//         </NavLink>

//         {/* Search */}
//         <NavLink to={"/home/Search"}
//           onClick={() => handleNavigation("search")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "search"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <Search className="w-6 h-6" strokeWidth={activeTab === "search" ? 2.5 : 2} />
//           <span>Search</span>
//         </NavLink>

//         {/* Explore */}
//         <NavLink  to={"/home/explore"}
//           onClick={() => handleNavigation("explore")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "explore"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <Compass className="w-6 h-6" strokeWidth={activeTab === "explore" ? 2.5 : 2} />
//           <span>Explore</span>
//         </NavLink>

//         {/* Messages */}
//         <NavLink  to={"/home/messages"}
//           onClick={() => handleNavigation("messages")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "messages"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <MessageSquare className="w-6 h-6" strokeWidth={activeTab === "messages" ? 2.5 : 2} />
//           <span>Messages</span>
//         </NavLink>

//         {/* Notifications */}
//         <NavLink  to={"/home/notifications"}
//           onClick={() => handleNavigation("notifications")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "notifications"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <Heart className="w-6 h-6" strokeWidth={activeTab === "notifications" ? 2.5 : 2} />
//           <span>Notifications</span>
//         </NavLink>

//         {/* Create */}
//         <NavLink to={"/home/create"}
//           onClick={() => handleNavigation("create")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "create"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <PlusSquare className="w-6 h-6" strokeWidth={activeTab === "create" ? 2.5 : 2} />
//           <span>Create</span>
//         </NavLink>

//         {/* Profile */}

//         <NavLink to={"/home/profile"}>
//         <button
//           onClick={() => handleNavigation("profile")}
//           className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
//             activeTab === "profile"
//               ? "bg-purple-100 font-semibold text-purple-700"
//               : "hover:bg-gray-200 font-medium text-gray-700"
//           }`}
//         >
//           <div
//             className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ${
//               activeTab === "profile" ? "ring-2 ring-purple-500 ring-offset-2" : ""
//             }`}
//           >
//             <User className="w-5 h-5 text-white" strokeWidth={2.5} />
//           </div>
          
//           <span>Profile</span>
//         </button></NavLink>
//       </div>
      

//       {/* Spacer */}
//       <div className="flex-grow"></div>

//       {/* More + Logout */}
//       <div className="relative">
//         <button
//           className="flex gap-4 items-center hover:bg-gray-200 p-3 rounded-xl w-full transition-all duration-200"
//           onClick={() => setOpenMore(!openMore)}
//         >
//           <Menu className="w-6 h-6" strokeWidth={2} />
//           <span className="font-medium text-gray-700">More</span>
//         </button>

//         {openMore && (
//           <div className="absolute bottom-16 left-0 bg-white shadow-2xl border border-gray-200 rounded-2xl w-56 py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
//             <button
//               className="flex gap-3 items-center px-4 py-3 hover:bg-gray-100 w-full text-left transition-colors duration-150 rounded-xl mx-1"
//               onClick={() => {
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970; path=/;";
//                 window.location.href = "/";
//               }}
//             >
//               <LogOut className="w-5 h-5 text-gray-700" strokeWidth={2} />
//               <span className="text-[15px] font-medium text-gray-800">Logout</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Home,
  Search,
  Compass,
  MessageSquare,
  User,
  Heart,
  Menu,
  LogOut,
  PlusSquare,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ axios import

export default function LeftBar() {
  const [openMore, setOpenMore] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      // backend pe logout API call
      const res = await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true } // cookie bhejne ke liye zaroori
      );

      if (res.data.success) {
        console.log("✅ Logout successful");
        navigate("/"); 
      } else {
        console.log("❌ Logout failed:", res.data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavigation = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-screen w-[280px] border-r border-gray-200 flex flex-col px-4 py-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Logo */}
      <div className="mb-12 px-3">
        <h1 className="text-[30px] font-extrabold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
          ConnectHub
        </h1>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 text-[16px]">
        <NavLink
          to={"/home"}
          onClick={() => handleNavigation("home")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "home"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <Home className="w-6 h-6" strokeWidth={activeTab === "home" ? 2.5 : 2} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to={"/home/Search"}
          onClick={() => handleNavigation("search")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "search"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <Search className="w-6 h-6" strokeWidth={activeTab === "search" ? 2.5 : 2} />
          <span>Search</span>
        </NavLink>

        <NavLink
          to={"/home/explore"}
          onClick={() => handleNavigation("explore")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "explore"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <Compass className="w-6 h-6" strokeWidth={activeTab === "explore" ? 2.5 : 2} />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to={"/home/messages"}
          onClick={() => handleNavigation("messages")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "messages"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <MessageSquare className="w-6 h-6" strokeWidth={activeTab === "messages" ? 2.5 : 2} />
          <span>Messages</span>
        </NavLink>

        <NavLink
          to={"/home/notifications"}
          onClick={() => handleNavigation("notifications")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "notifications"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <Heart className="w-6 h-6" strokeWidth={activeTab === "notifications" ? 2.5 : 2} />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to={"/home/create"}
          onClick={() => handleNavigation("create")}
          className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
            activeTab === "create"
              ? "bg-purple-100 font-semibold text-purple-700"
              : "hover:bg-gray-200 font-medium text-gray-700"
          }`}
        >
          <PlusSquare className="w-6 h-6" strokeWidth={activeTab === "create" ? 2.5 : 2} />
          <span>Create</span>
        </NavLink>

        <NavLink to={"/home/profile"}>
          <button
            onClick={() => handleNavigation("profile")}
            className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${
              activeTab === "profile"
                ? "bg-purple-100 font-semibold text-purple-700"
                : "hover:bg-gray-200 font-medium text-gray-700"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ${
                activeTab === "profile" ? "ring-2 ring-purple-500 ring-offset-2" : ""
              }`}
            >
              <User className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span>Profile</span>
          </button>
        </NavLink>
      </div>

      <div className="flex-grow"></div>

      {/* More + Logout */}
      <div className="relative">
        <button
          className="flex gap-4 items-center hover:bg-gray-200 p-3 rounded-xl w-full transition-all duration-200"
          onClick={() => setOpenMore(!openMore)}
        >
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="font-medium text-gray-700">More</span>
        </button>

        {openMore && (
          <div className="absolute bottom-16 left-0 bg-white shadow-2xl border border-gray-200 rounded-2xl w-56 py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              className="flex gap-3 items-center px-4 py-3 hover:bg-gray-100 w-full text-left transition-colors duration-150 rounded-xl mx-1"
              onClick={handleLogout} // ✅ API call trigger
            >
              <LogOut className="w-5 h-5 text-gray-700" strokeWidth={2} />
              <span className="text-[15px] font-medium text-gray-800">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
