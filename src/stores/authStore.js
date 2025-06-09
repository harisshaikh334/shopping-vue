import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db, auth } from '@/utility/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { ROLE_ADMIN, ROLE_USER } from '@/constants/appConstant'


export const userAuthStore =defineStore("authStore", () => {
    const user =ref(null);
    const error = ref(null);
    const role = ref(null);
    const isAuthenticated = computed(() => user.value !== null);
    const isAdmin = computed(() => role.value === ROLE_ADMIN)
    const initialized = ref(false);
    const initializeAuth = async () => {
        return new Promise((resolve) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
            user.value = firebaseUser
            await fetchUserRole(firebaseUser.uid)
            initialized.value = true
            } else {
            clearUser()
            }
            resolve()
        })
        })
    }


    const signUpUser =  async (email, password) => {
        
        try{
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCreds.user.uid), {
                email: userCreds.user.email,
                role: ROLE_USER,
                createdAt: new Date(),
            })

            clearUser();
            error.value = null;


        }catch(err) {
            error.value = err.message;
            console.log("err.meesage ", err.message);
            // console.log("err ", err);
            throw err;
        } finally {
            
        }
        

    }

    const signInUser = async (email, password) => {
        try {
            const userCreds = await signInWithEmailAndPassword(auth, email, password);
            user.value = userCreds.user;
            error.value = null;
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
    
        }
    }

    const clearUser = async () => {
        user.value = null;
        role.value = null;
    }

    const signOutUser = async () => {
        try {
            await signOut(auth)
            clearUser()
            error.value = null
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
        
        }
    }

    return {user, role, error, signUpUser, signInUser, isAdmin, isAuthenticated, initializeAuth, signOutUser, initialized}; 

})