<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contrasena" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
// import { useRouter } from 'vue-router'

// const router = useRouter()

const userStore = useUserStore()

const email = ref('marcosj@gmeil.com')
const password = ref('4234324')

const handleSubmit = async  () => {
    if (!email.value || password.value.length < 6) {
        return alert('Papacho Rellena los campos')
    }
    await userStore.refisterUser(email.value, password.value)
    // router.push('/')
}
</script>

<style lang="scss" scoped></style>