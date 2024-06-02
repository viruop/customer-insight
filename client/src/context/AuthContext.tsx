import { User } from "@/types";
import { createContext } from "react";

interface AuthContextType {
  loggedIn: boolean | null;
  checkLoginState: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
