<template>
  <div>
    <h1>app neko</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Requister</router-link>
      <button>Logout</button>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>