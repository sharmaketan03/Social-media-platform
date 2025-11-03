// import React, { useContext, useState, useRef } from "react";
// import { MyContext } from "./UseContext";
// import { motion } from "framer-motion";
// import { Camera } from "lucide-react";
// import instance from "./axios"; 

// function ProfileUpdate() {
//   const { userId } = useContext(MyContext);
//   const fileRef = useRef(null);

//   const [preview, setPreview] = useState(null);
//   const [profilePic, setProfilePic] = useState(null);
//   const [bio, setBio] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePic(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       alert("User not logged in");
//       return;
//     }

//     const formData = new FormData();
//     if (profilePic) formData.append("profilePic", profilePic);
//     formData.append("bio", bio);

//     try {
//       const res = await instance.put(`/profile/update-profile/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       alert("Profile updated successfully ✅");
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//       alert("Profile update failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-900 py-8 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-white rounded-2xl p-8 w-[400px] shadow-xl text-center"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Profile</h2>

//         <div
//           className="w-36 h-36 mx-auto bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
//           onClick={() => fileRef.current.click()}
//         >
//           {preview ? (
//             <img src={preview} alt="profile" className="w-full h-full rounded-full object-cover" />
//           ) : (
//             <Camera className="w-10 h-10 text-gray-500" />
//           )}

//           <input type="file" ref={fileRef} className="hidden" onChange={handleImageChange} />
//         </div>

//         <textarea
//           placeholder="Write something about you..."
//           className="border rounded-md w-full mt-6 p-3 text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />

//         <button
//           onClick={handleSubmit}
//           className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
//         >
//           Save Changes
//         </button>
//       </motion.div>
//     </div>
//   );
// }

// export default ProfileUpdate;



import React, { useContext, useState, useRef } from "react";
import { MyContext } from "./UseContext";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import instance from "./axios";

function ProfileUpdate() {
  const { userId } = useContext(MyContext);
  const fileRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();
    if (profilePic) formData.append("profilePic", profilePic);
    formData.append("bio", bio);

    try {
      const res = await instance.put(`/profile/update-profile/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Profile updated successfully ✅");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert("Profile update failed ❌");
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h2 style={styles.heading}>Update Profile</h2>

        <div
          style={preview ? styles.imagePreview : styles.uploadBox}
          onClick={() => fileRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="profile" style={styles.image} />
          ) : (
            <Camera className="w-10 h-10 text-gray-500" />
          )}

          <input type="file" ref={fileRef} style={styles.hiddenInput} onChange={handleImageChange} />
        </div>

        <textarea
          placeholder="Write something about you..."
          style={styles.textarea}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button onClick={handleSubmit} style={styles.button}>
          Save Changes
        </button>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "32px 16px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "32px",
    color: "#1f2937",
    letterSpacing: "-0.5px",
  },
  uploadBox: {
    width: "150px",
    height: "150px",
    margin: "0 auto",
    backgroundColor: "#f3f4f6",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "3px dashed #9ca3af",
    transition: "all 0.3s ease",
  },
  imagePreview: {
    width: "150px",
    height: "150px",
    margin: "0 auto",
    borderRadius: "50%",
    cursor: "pointer",
    overflow: "hidden",
    border: "4px solid #667eea",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    transition: "all 0.3s ease",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  hiddenInput: {
    display: "none",
  },
  textarea: {
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    width: "100%",
    marginTop: "28px",
    padding: "14px",
    fontSize: "15px",
    backgroundColor: "#f9fafb",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "100px",
  },
  button: {
    marginTop: "28px",
    width: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#ffffff",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  },
};

export default ProfileUpdate;