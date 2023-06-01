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
import { Product } from "../types";

const collection_name = "products";

export const getAllProduct = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createProduct = async (data: Product) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const modifyProduct = async (id: string, data: Product) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getProductById = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
