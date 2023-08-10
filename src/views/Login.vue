<template>
    <a-row>
        <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">

            <h1>Login</h1>
            <a-form name="basic" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item name="email" label="Ingresa Tu correo"
                    :rules="[{ required: true, type: 'email', whitespace: true, message: 'Ingresa un email valido' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item label="Ingrese Contraseña" name="password"
                    :rules="[{ required: true, min: 6, whitespace: true, message: 'Ingresa Una contraseña minimo 6 caracteres' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser" :loading="userStore.loadingUser" >Ingresar</a-button>
                </a-form-item>
            </a-form>
        </a-col>

    </a-row>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '../stores/user'
import { message } from 'ant-design-vue';

const formState = reactive({
    email: '',
    password: ''
})


const userStore = useUserStore()




const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.loginUser(formState.email, formState.password)

    if (!error) {
        return message.success('Bienvenido a la app!')
    }
    switch (error) {
        case 'auth/wrong-password':
            message.error('Contraseña incorrecta')
            break;
        case 'auth/user-not-found':
            message.error('usuario no encontrado')
            break;
        case 'auth/too-many-requests':
            message.error('demaciados intentos prueba mas tarde')

        default:
            message.error('fallo algo desde firebase intentelo nuevamente')
            break
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>

<style lang="scss" scoped></style>