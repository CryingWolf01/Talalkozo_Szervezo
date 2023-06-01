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
import { Article } from "../types";

const collection_name = "articles";

export const getArticleList = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createArticle = async (data: Article) => {
  await addDoc(collection(getDb(), collection_name), data);
};

export const modifyArticle = async (id: string, data: Article) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
};

export const deleteArticle = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getArticleById = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
