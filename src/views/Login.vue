<script setup>
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const username = ref("");
const password = ref("");
const route = useRoute();
const login = () => {
  window.user = username.value;
  router.push({ name: (route.query.redirect || 'protected') });
};
</script>
<template>
  <div class="login">
    <form action="" class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <input v-model="username" name="username" type="text" class="input" />
      <label for="password">Password</label>
      <input v-model="password" name="password" type="password" class="input" />
      <button class="btn">Login</button>
    </form>
  </div>
</template>
