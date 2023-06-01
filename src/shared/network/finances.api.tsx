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
import { FinancesData } from "../types";

const collection_name = "finances";

export const getAllFinances = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createFinances = async (data: FinancesData) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const modifyFinances = async (id: string, data: FinancesData) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
};

export const deleteFinances = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getFinancesData = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
