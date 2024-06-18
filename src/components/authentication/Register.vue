<template>
  <div>
    <h1>{{ titleText }}</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button :style="{ backgroundColor: color }" type="submit">
        Register
      </button>
    </form>
    <router-link to="/login">Already have an account? Login</router-link>
  </div>
</template>

<script setup>
import posthog from "posthog-js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authRegister } from "./../../api";

const username = ref("");
const password = ref("");
const router = useRouter();
const titleText = ref(""); // Default title
const color = ref(""); // Default color

posthog.setPersonPropertiesForFlags({
  $browser: Math.random() > 0.5 ? "Chrome" : "Not Chrome",
});

onMounted(async () => {
  posthog.onFeatureFlags(() => {
    const isDarkMode = posthog.getFeatureFlag("theme") === "dark";
    titleText.value = isDarkMode ? "Sign up now!" : "Join our community!";
    color.value = isDarkMode ? "white" : "green";
  });
});

const register = async () => {
  try {
    await authRegister(username.value, password.value);
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
};
</script>
