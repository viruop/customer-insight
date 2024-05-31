import axios from "axios";

const baseURL = "http://localhost:5500";

const client = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

type Request = { url: string; requestBody: string };

class App {
  post<TResponse>({ url, requestBody }: Request) {
    return client.post<TResponse>(url, {
      requestBody,
    });
  }

  get<TResponse>(url: string) {
    return client.get<TResponse>(url, {
      data: {},
    });
  }
}

const app = new App();

export default {
  app,
};
