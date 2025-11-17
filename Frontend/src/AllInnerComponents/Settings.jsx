import { useState } from "react";
import instance from "../Components/axios";

export default function Settings() {
  const [accountType, setAccountType] = useState("public"); // default value
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Function to update account privacy
  async function handleAccountChange(value) {
    try {
      const res = await instance.post(
        "/profile/Accountsettings",
        { accountType: value },
        { withCredentials: true }
      );

      if (res.status === 200 || res.data.success) {
        setAccountType(value); // update state after API success
        console.log("Account updated to:", value);
      }
    } catch (err) {
      console.log("AccountSettings error:", err);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Account Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account</h2>

        {/* Account Privacy */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 p-4 border rounded-lg hover:bg-gray-50 transition">
          <div>
            <h3 className="font-medium">Account Privacy</h3>
            <p className="text-gray-500 text-sm">Control who can see your posts and profile.</p>
          </div>
          <select
            value={accountType}
            onChange={(e) => handleAccountChange(e.target.value)}
            className="mt-2 md:mt-0 border rounded-lg px-3 py-2"
          >
            <option value="private">Private Account</option>
            <option value="public">Public Account</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 p-4 border rounded-lg hover:bg-gray-50 transition">
          <div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-gray-500 text-sm">Enable or disable notifications.</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 mt-2 md:mt-0"
          />
        </div>

        {/* Dark Mode */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
          <div>
            <h3 className="font-medium">Dark Mode</h3>
            <p className="text-gray-500 text-sm">Switch between light and dark themes.</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5 mt-2 md:mt-0"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
}
