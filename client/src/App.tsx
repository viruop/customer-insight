import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Account, GetCustomersObject } from "@/types";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const App: React.FC = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, Anytown USA",
      accounts: [
        { id: 1, balance: 5000 },
        { id: 2, balance: 10000 },
        { id: 3, balance: 2500 },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Oak Rd, Somewhere City",
      accounts: [
        { id: 4, balance: 7500 },
        { id: 5, balance: 3000 },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      address: "789 Elm St, Othertown",
      accounts: [{ id: 6, balance: 15000 }],
    },
  ];
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const fetchData = async () => {
    const response = await api.app.get<GetCustomersObject[]>("/customers");
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchData"],
    queryFn: () => fetchData(),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Accounts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>
                {customer.accounts.map((account) => (
                  <div
                    key={account.id}
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => handleAccountClick(account)}
                  >
                    Account {account.id}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAccount && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Transactions for Account {selectedAccount.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-04-01</TableCell>
                  <TableCell>Deposit</TableCell>
                  <TableCell>$1,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-04-15</TableCell>
                  <TableCell>Withdrawal</TableCell>
                  <TableCell>-$500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>$50.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
