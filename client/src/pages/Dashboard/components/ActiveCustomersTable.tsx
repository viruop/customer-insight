import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import api from "@/lib/api";
import {
  Account,
  GetCustomersObject,
  GetTransactionsByAccoutID,
} from "@/types";
import { FC, useState } from "react";

interface ActiveCustomersTableProps {
  customers: GetCustomersObject[];
}

const ActiveCustomersTable: FC<ActiveCustomersTableProps> = ({ customers }) => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] =
    useState<GetTransactionsByAccoutID[]>();

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
      <Table className="border bg-card">
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
                    className="cursor-pointer text-primary hover:underline"
                    onClick={() => handleAccountClick(account)}
                  >
                    {account.id}
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

export default ActiveCustomersTable;
