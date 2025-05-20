import axios from "./axios";

// POST: Login user
export const loginUser = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  console.log(response);
  return response.data; // { user, token }
};

// POST: Register user
export const registerUser = async (userData) => {
  const response = await axios.post("/auth/register", userData);
  return response.data; // { user, token }
};

// GET: Fetch current user
export const getCurrentUser = async () => {
  const response = await axios.get("/auth/me");
  return response.data; // { user }
};
