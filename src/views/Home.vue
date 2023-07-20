<template>
    <div>
        <h1>home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <ul>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} - <br>
                {{ item.name }} - <br>
                {{ item.user }}- <br>
                {{ item.short }}- <br>
                <!-- {{ item.sho }} -->
            </li>
        </ul>

    </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/databse';
const useStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getUrls()

onAuthStateChanged(auth, (user) => {
    console.log(user)
})

</script>

<style lang="scss" scoped></style>