// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@services/firebase/config";
// import { useAuth } from "@contexts/AuthContext";
// import { toast } from "react-hot-toast";

// export default function ProfileEditModal({ onClose }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({ displayName: "", email: "", role: "" });
//   const [loading, setLoading] = useState(false);

//   // Fetch existing profile
//   useEffect(() => {
//     if (user?.uid) {
//       const fetchProfile = async () => {
//         const userRef = doc(db, "users", user.uid);
//         const snap = await getDoc(userRef);
//         if (snap.exists()) {
//           const data = snap.data();
//           setFormData({
//             displayName: data.displayName || "",
//             email: data.email || "",
//             role: data.role || "viewer",
//           });
//         }
//       };
//       fetchProfile();
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user?.uid) return;

//     setLoading(true);
//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, {
//         displayName: formData.displayName,
//         email: formData.email,
//         role: formData.role,
//       });
//       toast.success("Profile updated successfully!");
//       onClose();
//     } catch (err) {
//       toast.error("Failed to update profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//       <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-lg relative">
//         {/* Close */}
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
//           <X size={20} />
//         </button>

//         <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
//           Edit Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1 dark:text-gray-300">
//               Display Name
//             </label>
//             <input
//               type="text"
//               name="displayName"
//               value={formData.displayName}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1 dark:text-gray-300">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1 dark:text-gray-300">
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//             >
//               <option value="viewer">Viewer</option>
//               <option value="editor">Editor</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg text-white transition ${
//               loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Saving..." : "Save Changes"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }