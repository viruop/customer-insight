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
