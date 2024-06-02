import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import AuthContext from "@/context/AuthContext";
import api from "@/lib/api";
import {
  Account,
  GetCustomersObject,
  GetTransactionsByAccoutID,
} from "@/types";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Dashboard: React.FC = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext)!;
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [customers, setCustomers] = useState<GetCustomersObject[]>();
  const [transactions, setTransactions] =
    useState<GetTransactionsByAccoutID[]>();

  useEffect(() => {
    if (loggedIn === true) {
      fetchData();
    }
  }, [loggedIn]);

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

  const handleLogout = async () => {
    try {
      await axios.post(`${siteConfig.serverUrl}/auth/logout`);
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <a className="flex items-center gap-2 font-semibold">
                <span className="">Dashboard</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
              <h1 className="text-lg font-semibold md:text-2xl">
                Welcome {user?.name}
              </h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <img src={user?.picture} alt="User avatar" />
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Table</h1>
            </div>

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
                    <CardTitle>
                      Transactions for Account {selectedAccount.id}
                    </CardTitle>
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
                              <TableCell>
                                {new Date(el.date).toDateString()}
                              </TableCell>
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
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
