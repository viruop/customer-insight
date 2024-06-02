export type GetCustomersObject = {
  _id: string;
  name: string;
  address: string;
  accounts: Account[];
  isActive: boolean;
  __v: number;
};

export type Account = {
  id: string;
  _id: string;
};

export type GetTransactionsByAccoutID = {
  _id: string;
  accountId: string;
  amount: number;
  transactionType: string;
  date: string;
  __v: number;
};

export type User = {
  name: string;
  email: string;
  picture: string;
};
