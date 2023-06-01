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
import { ShoppingListData } from "../types";

const collection_name = "shopping-lists";

export const getAllShoppingList = async () => {
  let result: any[] = [];
  await getDocs(collection(getDb(), collection_name)).then((snapshot) => {
    result = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  });

  return result;
};

export const createShoppingList = async (data: ShoppingListData) => {
  await addDoc(collection(getDb(), collection_name), data);
  //itt még majd meg kell hívni a finances létrehozó/módosító függvényét, függően attól, hogy adott hónapban van-e már kiadás/nincs.
  /*createFinances()
  modifyFinances()*/
};

export const modifyShoppingList = async (
  id: string,
  data: ShoppingListData
) => {
  await updateDoc(doc(getDb(), collection_name, id), data);
  //itt még majd meg kell hívni a finances létrehozó/módosító függvényét, függően attól, hogy adott hónapban van-e már kiadás/nincs.
  /*createFinances()
  modifyFinances()*/
};

export const deleteShoppingList = async (id: string) => {
  await deleteDoc(doc(getDb(), collection_name, id));
};

export const getShoppingListData = async (id: string) => {
  let result: any;
  await getDoc(doc(getDb(), collection_name, id)).then((snapshot) => {
    result = { ...snapshot.data(), id: snapshot.id };
  });

  return result;
};
