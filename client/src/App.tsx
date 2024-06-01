import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./components/ui/table";
import api from "./lib/api";
import {
  Account,
  GetCustomersObject,
  GetTransactionsByAccoutID,
} from "./types";
import { Button } from "./components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar } from "./components/ui/avatar";

// Ensures cookie is sent
axios.defaults.withCredentials = true;

const serverUrl = "http://localhost:5500";

interface User {
  name: string;
  email: string;
  picture: string;
}

interface Post {
  title: string;
  body: string;
}

interface AuthContextType {
  loggedIn: boolean | null;
  checkLoginState: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const checkLoginState = useCallback(async () => {
    try {
      const {
        data: { loggedIn: logged_in, user },
      } = await axios.get(`${serverUrl}/auth/logged_in`);
      setLoggedIn(!!logged_in);
      user && setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  );
};

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
      await axios.post(`${serverUrl}/auth/logout`);
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <header className="h-[60px] border flex items-center px-4 shadow-md">
        <h1 className="text-sm font-medium text-gray-900 dark:text-gray-50 flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <img src={user?.picture} alt="User avatar" />
          </Avatar>
          {user?.name}
        </h1>
        <Button
          size={"icon"}
          className="ml-auto"
          onClick={() => handleLogout()}
        >
          <ExitIcon />
        </Button>
      </header>
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

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      const {
        data: { url },
      } = await axios.get(`${serverUrl}/auth/url`);
      window.location.assign(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h3>Login to Dashboard</h3>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

const Callback: React.FC = () => {
  const called = useRef(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return;
          called.current = true;
          const res = await axios.get(
            `${serverUrl}/auth/token${window.location.search}`
          );
          console.log("response: ", res);
          checkLoginState();
          navigate("/");
        } catch (err) {
          console.error(err);
          navigate("/");
        }
      } else if (loggedIn === true) {
        navigate("/");
      }
    })();
  }, [checkLoginState, loggedIn, navigate]);

  return null;
};

const Home: React.FC = () => {
  const { loggedIn } = useContext(AuthContext)!;
  if (loggedIn === true) return <Dashboard />;
  if (loggedIn === false) return <Login />;
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/callback",
    element: <Callback />,
  },
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </header>
    </div>
  );
};

export default App;
