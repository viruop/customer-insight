import AuthContext from "@/context/AuthContext";
import axios from "axios";
import { useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { siteConfig } from "@/config/site";

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
            `${siteConfig.serverUrl}/auth/token${window.location.search}`
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

export default Callback;
