export type User = {
  id?: number;
  password: string;
  username: string;
};
export type ShoppingListData = {
  id: string;
  name: string;
  userId: string;
  date: string;
  shoppingListItems?: ShoppingListItem[];
  price: number;
};

export type ShoppingListItem = {
  name: string;
  price: string;
  quantity: number;
  unit: string;
};

export type FinancesData = {
  date: string;
  userId: string | number;
  finance: string | number;
  financeItems: FinanceItem[];
};

export type FinanceItem = {
  name: string;
  price: string;
};

export type Product = {
  id: string;
  name: string;
  price: string;
  unit: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  date: string;
};
