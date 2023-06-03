import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getDb } from "../../config/database";
import { Event } from "../types";

const collection_name = "event";

export const getEventList = async () => {
  let result: any[] = [];
  await getDocs(
    query(collection(getDb(), collection_name), orderBy("date"))
  ).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createEvent = async (data: Event) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const modifyEvent = async (id: string, data: Event) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
};

export const deleteEvent = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getEventById = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
