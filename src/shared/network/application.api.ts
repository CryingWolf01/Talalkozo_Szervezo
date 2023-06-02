import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { getDb } from "../../config/database";
import { Event } from "../types";

const collection_name = "application";

export const createApplication = async (data: Event) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const deleteApplication = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};
