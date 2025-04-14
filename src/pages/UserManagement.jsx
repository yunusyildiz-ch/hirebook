import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { toast } from "react-hot-toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: newRole });
      toast.success("Role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Error updating role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-6">Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 User Management</h1>
      <table className="min-w-full table-auto text-sm border dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700 text-left">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Display Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t dark:border-gray-600">
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.displayName || "-"}</td>
              <td className="p-2 font-medium">{user.role || "viewer"}</td>
              <td className="p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg-white dark:bg-gray-800 border dark:border-gray-600 p-1 rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}