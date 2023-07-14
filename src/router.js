import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/login.vue";
import Register from "./views/Register.vue";

const routes  = [
  { path: "/", component: () => import('./views/Home.vue') },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
