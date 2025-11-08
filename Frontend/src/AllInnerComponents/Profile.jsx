// import React, { useEffect, useState } from "react";
// import instance from "../Components/axios"; 
// import { Camera, Settings } from "lucide-react";
// import { Link } from "react-router-dom";


// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // ✅ Correct API path & credentials
//         const res = await instance.get("/profile/getProfile", { withCredentials: true });
//         console.log(res)
//         // ✅ Safe data extraction
//         setUser(res.data.user);
//         setPosts(res.data.user.posts || []);
//       } catch (error) {
//         console.error("Profile fetch error:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400">
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full max-w-4xl mx-auto mt-10 px-4">
//       {/* Top Section */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b pb-6">
//         {/* Profile Picture */}
//         <div className="relative">
//         <Link to={"/home/profilepicupdate"}>
      
//           <img
//             src={user.profilePic}
//             alt="Profile"
//             className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-gray-300"
//           />
//           <button className="absolute bottom-2 right-2 bg-gray-100 p-1 rounded-full shadow">
//             <Camera size={18} />
//           </button>
//             </Link>  
//         </div>

//         {/* User Info */}
//         <div className="flex flex-col gap-3 text-center sm:text-left">
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-semibold">{user.username}</h2>
//             <Link to={"/home/editProfile"} className="px-3 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300">
//               Edit Profile
//             </Link>
//             <Settings size={20} className="cursor-pointer" />
//           </div>

//           <div className="flex justify-center sm:justify-start gap-6 text-gray-700">
//             <span>
//               <strong>{posts.length}</strong> posts
//             </span>
//             <span>
//               <strong>{user.followers?.length || 0}</strong> followers
//             </span>
//             <span>
//               <strong>{user.following?.length || 0}</strong> following
//             </span>
//           </div>

//           <div>
//             <p className="font-semibold  mt-3">{user.fullName}</p>
//             {user.bio && <p className="text-gray-600 mt-5"><spn className="font-bold">Bio:</spn> {user.bio}</p>}
//             {user.website && (
//               <a
//                 href={user.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-500"
//               >
//                 {user.website}
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Posts Section */}
//       <div className="mt-8">
//         <div className="grid grid-cols-3 gap-2 sm:gap-4">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post._id} className="relative group">
//                 <img
//                   src={post.imageUrl}
//                   alt="Post"
//                   className="w-full h-40 sm:h-60 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex justify-center items-center text-white font-semibold">
//                   ❤️ {post.likes?.length || 0} &nbsp; 💬 {post.comments?.length || 0}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-gray-400 col-span-3 text-center">
//               No posts yet
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import instance from "../Components/axios"; 
import { Camera, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get("/profile/getProfile", { withCredentials: true });
        setUser(res.data.user);
        setPosts(res.data.user.posts || []);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading profile...
      </div>
    );
  }

  // Profile pic click -> open file input
  const handlePicClick = () => inputRef.current.click();

  // File select -> preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // Upload to backend
  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first");

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await instance.put("/profile/updateProfilepic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // Update user state immediately
      setUser({ ...user, profilePic: res.data.user });
      setSelectedFile(null);
      alert("Profile picture updated ✅");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-10 px-4">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b pb-6">
        {/* Profile Picture */}
        <div className="relative flex flex-col items-center">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : user.profilePic}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
            onClick={handlePicClick}
          />
          <button className="absolute bottom-2 right-2 bg-gray-100 p-1 rounded-full shadow">
            <Camera size={18} />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <button
              onClick={handleUpload}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Upload
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{user.username}</h2>

            {/* Edit Profile link */}
            <Link
              to="/home/editProfile"
              className="px-3 py-1 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
            >
              Edit Profile
            </Link>

            <Settings size={20} className="cursor-pointer" />
          </div>

          <div className="flex justify-center sm:justify-start gap-6 text-gray-700">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{user.followers?.length || 0}</strong> followers
            </span>
            <span>
              <strong>{user.following?.length || 0}</strong> following
            </span>
          </div>

          <div>
            <p className="font-semibold mt-3"><span className="font-bold">Name: </span>{user.fullName}</p>
            {user.bio && <p className="text-gray-600"><span className="font-bold">Bio:</span> {user.bio}</p>}
            {user.website && (
              <p>
                <span className="font-bold">Website:</span>{" "}
                <a href={user.website} target="_blank" rel="noreferrer" className="text-blue-500">
                  {user.website}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="relative group">
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-40 sm:h-60 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex justify-center items-center text-white font-semibold">
                  ❤️ {post.likes?.length || 0} &nbsp; 💬 {post.comments?.length || 0}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 col-span-3 text-center">No posts yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
