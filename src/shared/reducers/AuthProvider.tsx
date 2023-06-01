import { useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, [auth]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};