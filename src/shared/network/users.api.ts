import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { getDb } from "../../config/database";
import { User } from "../types";

const collection_name = "user";

export const getUserList = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createUser = async (data: User) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const modifyUser = async (id: string, data: User) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
};

export const deleteUser = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getUserById = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
