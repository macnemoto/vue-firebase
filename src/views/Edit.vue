<template>
    
<h1 class="text-center">Editar id: {{ route.params.id }} </h1>
    <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="Ingrese Url" :rules="[{
            required: true,
            whitespace: true,
            message: 'Ingrese una URL valida',
            pattern: urlRegex
        }]">
            <a-input v-model:value='formState.url'></a-input>
        </a-form-item>
        <a-space>
            <a-button type="primary" html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">Editar Url</a-button>
            <a-button damgere @click="goBack" >Volver</a-button>
        </a-space>
        <a-form-item>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/databse'
import { message } from 'ant-design-vue';
import router from '../router';

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

const formState = reactive({
    url:''
})

const databaseStore = useDatabaseStore()
const route = useRoute()
console.log(route.params)

const goBack = () => {
router.go(-1)
}

const onFinish = async (value) => {
    console.log('todo correcto' + value)
  const error = await  databaseStore.updateUrl(route.params.id, formState.url)
  if(!error){
    formState.url = ''
    return message.success('URL Editada correctamente!  ✅🎉')
  }
  switch (error) {
    //buscar los errrores de firestore
        default:
            message.error('fallo algo desde firebase intentelo nuevamente ❌')
            break
    }
}



onMounted( async () =>{
 formState.url = await databaseStore.leerUrl(route.params.id)
})


</script>

