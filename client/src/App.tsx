import "./App.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Account,
  GetCustomersObject,
  GetTransactionsByAccoutID,
} from "@/types";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const App: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [customers, setCustomers] = useState<GetCustomersObject[]>();
  const [transactions, setTransactions] =
    useState<GetTransactionsByAccoutID[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.app.get<GetCustomersObject[]>("/customers");
    setCustomers(response.data);
  };

  const fetchTransactions = async (accountId?: string) => {
    const response = await api.app.get<GetTransactionsByAccoutID[]>(
      `/transactions/${accountId}`
    );
    setTransactions(response.data);
  };

  const handleAccountClick = async (account: Account) => {
    setSelectedAccount(account);
    await fetchTransactions(account.id);
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
          {customers?.map((customer) => (
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
                {transactions?.map((el, id) => {
                  return (
                    <TableRow key={id}>
                      <TableCell>{new Date(el.date).toDateString()}</TableCell>
                      <TableCell>{el.transactionType}</TableCell>
                      <TableCell>₹{el.amount}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
