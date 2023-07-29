<template>
    <div>
<h1>Editar id: {{ route.params.id }} </h1>
<form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese su Url" v-model="url" >
            <button type="submit" > Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/databse'
import router from '../router';

const databaseStore = useDatabaseStore()
const route = useRoute()
console.log(route.params)


const handleSubmit = () => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

if (!url.value.match(urlRegex)) {
  alert('Ingrese una URL válida.');
  return;
}
databaseStore.updateUrl(route.params.id, url.value)

    
}

const url = ref('')

onMounted( async () =>{
 url.value = await databaseStore.leerUrl(route.params.id)
})


</script>

