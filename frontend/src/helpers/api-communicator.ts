import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(
    "/user/signup",
    { name, email, password },
    { withCredentials: true }
  );
  if (res.status !== 201) {
    throw new Error("Signup failed");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unauthorized");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post(
    "/chat/new",
    { message },
    { withCredentials: true }
  );
  if (res.status !== 200) {
    throw new Error("Unable to send message");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to get chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Unable to delete chat");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout", { withCredentials: true });
  if (res.status !== 200) {
    throw new Error("Logout failed");
  }
  const data = await res.data;
  return data;
};
