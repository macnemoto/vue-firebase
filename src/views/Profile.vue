<template>
   <h1>Perfil de Usuario</h1>
   <a-row>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">

         <h1 class="text-center">Login</h1>
         <a-form name="basicPrefil" autocomplete="off" layout="vertical" :model="userStore.userData" @finish="onFinish">
            <a-form-item name="email" label="Ingresa Tu correo"
               :rules="[{ required: true, type: 'email', whitespace: true, message: 'Ingresa un email valido' }]">
               <a-input v-model:value="userStore.userData.email"></a-input>
            </a-form-item>
            <a-form-item>
               <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
                  :loading="userStore.loadingUser">Actualizar Informacion</a-button>
            </a-form-item>
         </a-form>
      </a-col>

   </a-row>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()


const onFinish = (value) => {

   
}

</script>

<style></style>