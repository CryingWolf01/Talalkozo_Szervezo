import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

export const getDb = () => {
  const app = initializeApp(firebaseConfig);
  let db = getFirestore(app);
  return db;
};
