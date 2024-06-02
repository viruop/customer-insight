import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AuthContext from "@/context/AuthContext";
import api from "@/lib/api";
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
import { cn } from "@/lib/utils";
import ActiveCustomersTable from "./components/ActiveCustomersTable";
import LowBalanceAccountsTable from "./components/LowBalanceAccountsTable";
import ProductsTable from "./components/ProductsTable";
import { GetCustomersObject } from "@/types";

type Nav = "Home" | "Low Balance Accounts" | "Products";

const Dashboard: React.FC = () => {
  const { user, loggedIn, checkLoginState } = useContext(AuthContext)!;
  const [nav, setNav] = useState<Nav>("Home");
  const [customers, setCustomers] = useState<GetCustomersObject[]>();
  const [lowBalanceAccounts, setLowBalanceAccounts] = useState<
    { accountId: string }[]
  >([]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    if (loggedIn === true) {
      fetchData();
    }
  }, [loggedIn]);

  const fetchData = async () => {
    const response = await api.app.get<GetCustomersObject[]>("/customers");
    setCustomers(response.data);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${siteConfig.serverUrl}/auth/logout`);
      checkLoginState();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (nav === "Low Balance Accounts") {
      getLowBalanceAccounts();
    } else if (nav === "Products") {
      getDistinctProducts();
    }
  }, [nav]);

  const navArray: Nav[] = ["Home", "Low Balance Accounts", "Products"];

  const getLowBalanceAccounts = async () => {
    const response = await api.app.get<{ accountId: string }[]>(
      `/transactionsbelow5000`
    );
    setLowBalanceAccounts(response.data);
  };

  const getDistinctProducts = async () => {
    const response = await api.app.get<string[]>(`/products`);
    setProducts(response.data);
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
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navArray.map((el, id) => {
                  return (
                    <a
                      key={id}
                      onClick={() => setNav(el)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        nav === el ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {el}
                    </a>
                  );
                })}
              </nav>
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
                  <Avatar className="">
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
              <h1 className="text-lg font-semibold md:text-2xl">
                {nav === "Home" ? "Active Customers" : nav}
              </h1>
            </div>
            {nav === "Home" &&
              (customers ? (
                <ActiveCustomersTable customers={customers} />
              ) : (
                "loading..."
              ))}
            {nav === "Low Balance Accounts" &&
              (lowBalanceAccounts ? (
                <LowBalanceAccountsTable accounts={lowBalanceAccounts} />
              ) : (
                "loading..."
              ))}
            {nav === "Products" &&
              (products ? <ProductsTable products={products} /> : "loading...")}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
