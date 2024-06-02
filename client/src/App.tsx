import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { User } from "@/types";
import { siteConfig } from "@/config/site";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AuthContext from "@/context/AuthContext";
import Callback from "@/components/Callback";

// Ensures cookie is sent
axios.defaults.withCredentials = true;

const serverUrl = siteConfig.serverUrl;

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
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
