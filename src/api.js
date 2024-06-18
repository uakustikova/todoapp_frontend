import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const readTodos = async () => {
  let res = await axios.get("http://localhost:8080/todos");

  return res.data;
};

const createTodo = async (name) => {
  let res = await axios.post("http://localhost:8080/todos", {
    name: name,
  });

  return res.data;
};

const doneTodo = async (id) => {
  let res = await axios.put(`http://localhost:8080/todos/${id}/done`);

  return res.data;
};

const undoneTodo = async (id) => {
  let res = await axios.delete(`http://localhost:8080/todos/${id}/done`);

  return res.data;
};

const authRegister = async (username, password) => {
  await axios.post(`http://localhost:8080/auth/register`, {
    username,
    password,
  });
};

const authLogin = async (username, password) => {
  let res = await axios.post(`http://localhost:8080/auth/login`, {
    username,
    password,
  });

  const token = res.data.token;
  localStorage.setItem("token", token);
};

export { authLogin, authRegister, createTodo, doneTodo, readTodos, undoneTodo };
