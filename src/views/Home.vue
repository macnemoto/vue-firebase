<template>
    <div>
        <h1>home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese su Url" v-model="url">
            <button type="submit" > Agregar</button>
        </form>
        <p v-if="databaseStore.loadingDoc">Loading docs...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} - <br>
                {{ item.name }} - <br>
                {{ item.user }}- <br>
                {{ item.short }}- <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`edit/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/databse';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const useStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getUrls()

onAuthStateChanged(auth, (user) => {
    // console.log(user)
})


const url = ref('')
const handleSubmit = () =>{
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

if (!url.value.match(urlRegex)) {
  alert('Ingrese una URL válida.');
  return;
}
databaseStore.addUrl(url.value)
}
</script>

<style lang="scss" scoped></style>