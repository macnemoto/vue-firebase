<template>
    <div>
        <h1 class="text-center">home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <add-form></add-form>
        <p v-if="databaseStore.loadingDoc">Loading docs...</p>
        <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%;">
            <a-card v-for="item of databaseStore.documents" :key="item.id" :title="item.short">
                <template #extra>
                    <a-space>
                        <a-button type="primary" @click="router.push(`edit/${item.id}`)">Editar</a-button>
                        <a-popconfirm title="Estas seguro que vas a eliminar la Url" ok-text="Si" cancel-text="No"
                            @confirm="confirm(databaseStore.deleteUrl(item.id))" @cancel="cancel">
                            <a-button danger :disabled="databaseStore.loading" :loading="databaseStore.loading" >Eliminar</a-button>
                        </a-popconfirm>
                    </a-space>
                </template>
                <p>{{ item.name }}</p>
            </a-card>
        </a-space>

    </div>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/databse';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
const router = useRouter()
const useStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getUrls()

onAuthStateChanged(auth, (user) => {
    // console.log(user)
})

const confirm = async (id) => {
 const error = await  databaseStore.deleteUrl(id)
 if(!error) return  message.success('Eliminado Correctamente')
 message.error(error)
}
const cancel = () => {
    message.error('No se elimino la Url')
}

</script>

<style lang="scss" scoped></style>