import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue";
import Login from "./views/login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: requireAuth,
    name: "home",
  }, {
    path: "/Profile",
    component: Profile,
    beforeEnter: requireAuth,
    name: "profile",
  },
  {
    path: "/edit/:id",
    component: Edit,
    beforeEnter: requireAuth,
    name: "edit",
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
