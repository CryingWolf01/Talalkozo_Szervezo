export type User = {
  id?: number;
  name?: string;
  password: string;
  email: string;
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

export type Event = {
  id?: string;
  title: string;
  date: string;
  description?: string;
  applifiedUsers?: ApplifiedUser[];
};

export type ApplifiedUser = {
  id: string;
  name: string;
  userId: string;
  email: string;
};
