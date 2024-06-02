import express from "express";
import cors from "cors";
import connectDatabase from "./database/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Request, Response } from "express";
import { stringify } from "node:querystring";

dotenv.config({ path: "./.env" });

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 36000,
};

const authParams = stringify({
  client_id: config.clientId,
  redirect_uri: config.redirectUrl,
  response_type: "code",
  scope: "openid profile email",
  access_type: "offline",
  state: "standard_oauth",
  prompt: "consent",
});

const getTokenParams = (code: string) =>
  stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUrl,
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(cookieParser());

const auth = (req: Request, res: Response, next: Function) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, config.tokenSecret!);
    return next();
  } catch (err) {
    console.error("Error: ", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/auth/url", (_, res) => {
  res.json({ url: `${config.authUrl}?${authParams}` });
});

app.get("/auth/token", async (req, res) => {
  const { code } = req.query;
  if (!code)
    return res
      .status(400)
      .json({ message: "Authorization code must be provided" });

  try {
    const tokenParam = getTokenParams(code as string);
    const {
      data: { id_token },
    } = await axios.post(`${config.tokenUrl}?${tokenParam}`);
    if (!id_token) return res.status(400).json({ message: "Auth error" });

    const { email, name, picture } = jwt.decode(id_token) as any;
    const user = { name, email, picture };
    const token = jwt.sign({ user }, config.tokenSecret!, {
      expiresIn: config.tokenExpiration,
    });

    res.cookie("token", token, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    res.json({ user });
  } catch (err: any) {
    console.error("Error: ", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

app.get("/auth/logged_in", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const { user } = jwt.verify(token, config.tokenSecret!) as any;
    const newToken = jwt.sign({ user }, config.tokenSecret!, {
      expiresIn: config.tokenExpiration,
    });

    res.cookie("token", newToken, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

app.post("/auth/logout", (_, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

connectDatabase();
export default app;
