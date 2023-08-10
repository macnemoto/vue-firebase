
<template>
    <a-form name="addform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
        <a-form-item name="url" label="Ingrese Url" :rules="[{
            required: true,
            whitespace: true,
            message: 'Ingrese una URL valida',
            pattern: urlRegex
        }]">
            <a-input v-model:value='formState.url'></a-input>
        </a-form-item>
        <a-button type="primary" html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">Agregar Url</a-button>
        <a-form-item>
        </a-form-item>
    </a-form>
</template>


<script setup>
import { reactive } from 'vue';
import { useDatabaseStore} from '../stores/databse'
import { message } from 'ant-design-vue';


const databaseStore = useDatabaseStore()
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const formState = reactive({
    url: ''
})

const onFinish = async (value) => {
    console.log('todo correcto' + value)
  const error = await  databaseStore.addUrl(formState.url)
  if(!error){
    formState.url = ''
    return message.success('URL agregada correctamente!  ✅🎉')
  }
  switch (error) {
    //buscar los errrores de firestore
        default:
            message.error('fallo algo desde firebase intentelo nuevamente ❌')
            break
    }
}
</script>

