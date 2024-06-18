<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <router-link to="/register">Don't have an account? Register</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authLogin } from "../../api";

const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    await authLogin(username.value, password.value);
    router.push("/todos");
  } catch (error) {
    console.error(error);
  }
};
</script>
