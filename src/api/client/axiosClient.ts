import axios from "axios";
import type { AxiosInstance } from "axios";

class AxiosClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  public getInstance(): AxiosInstance {
    return this.client;
  }
}

export default new AxiosClient().getInstance();
