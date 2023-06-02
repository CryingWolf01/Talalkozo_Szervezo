export type User = {
  id?: number;
  uid?: string;
  name?: string;
  password: string;
  email: string;
};

export type Event = {
  id?: string;
  title: string;
  date: string;
  description?: string;
};

export type AppliedUser = {
  id?: string;
  eventId: string;
  name: string;
  email: string;
  uid?: string;
};
