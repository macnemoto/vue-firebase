<template>
    <div>
        <h1>home</h1>
        <p>{{ useStore.userData?.email }}</p>

    </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';
const useStore = useUserStore()


onAuthStateChanged(auth, (user) => {
    console.log(user)
})

</script>

<style lang="scss" scoped>
</style>