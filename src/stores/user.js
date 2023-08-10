import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./databse";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false
  }),
  getters: {
    minuscula(state) {
      return state.userData.toLocaleLowerCase();
    },
  },
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error){
        console.log(error.code);
        return error.code
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      try {
        this.loadingUser = true;
        const user = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error.code);
        return error.code
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore()
      databaseStore.$reset()
      try {
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) =>{
        const unsuscribe = onAuthStateChanged(auth, user => {
          if(user){
        this.userData = { email: user.email, uid: user.uid };

          }else {
            this.userData = null
            const databaseStore = useDatabaseStore()
            databaseStore.$reset()
          }
          resolve(user)
        }, e=> reject(e))
        unsuscribe()
      })
    }
  },
});
