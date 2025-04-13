import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/services/firebase/config";

export default function useRole() {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setRole(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setRole(docSnap.data().role || "viewer");
      } else {
        setRole("viewer");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { role, loading };
}
