import axios from "axios";

const API_URL = 'https://localhost:7280/api';

const meetpointApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { meetpointApi, API_URL };
