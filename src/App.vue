<template>
  <div>
    <h1>app neko</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link>
      <router-link to="/login" v-if="!userStore.userData">Login</router-link>
      <router-link to="/register" v-if="!userStore.userData">Requister</router-link>
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>
      Loading...
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped></style>