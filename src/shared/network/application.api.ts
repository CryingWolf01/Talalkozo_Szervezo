import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { getDb } from "../../config/database";
import { AppliedUser } from "../types";

const collection_name = "application";

export const createApplication = async (data: AppliedUser) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const getAppliedUsersList = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const deleteApplication = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};
