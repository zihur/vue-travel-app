<script setup>
import router from "@/router";
import { ref } from "vue";

const username = ref(window.user);
const logout = () => {
  window.user = null;
  router.push({ name: "home" });
};

</script>
<template>
  <div>
    <h1>Greetings, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <router-link :to="{ name: 'invoices' }">
      <button @click="invoices">Invoices</button>
    </router-link>
  </div>
</template>
