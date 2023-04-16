import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

if (process.env.NODE_ENV === "development") {
  // Change to your local BE server url
  http.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
}

http.interceptors.response.use(
  async (response) => {
    const { data } = response;
    return Promise.resolve(data);
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default http;
