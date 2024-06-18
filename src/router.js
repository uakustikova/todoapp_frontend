// src/router/index.js
import TodoList from "@/components/TodoList.vue";
import Login from "@/components/authentication/Login.vue";
import Register from "@/components/authentication/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/todos", component: TodoList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
