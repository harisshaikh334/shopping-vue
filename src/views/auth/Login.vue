<template>
    <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Sign In</h4>
            <form v-on:submit.prevent="handleSignIn()">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="form.email" class="form-control" id="email" required />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Sign In
              </button>
              <div v-if="errMessage" class="alert alert-danger mt-3 mb-0">{{errMessage}}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Don't have an account?
              <routerLink :to="APP_ROUTE_NAMES.SIGNUP">Register here</routerLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSwal } from '@/utility/useSwal';
import { APP_ROUTE_NAMES } from '@/constants/routeNames';
import { userAuthStore } from '@/stores/authStore';
const {showSuccess, showError} = useSwal();

const authStore = userAuthStore()
const router = useRouter()
const errMessage = ref("");
const loading = ref(false);
const form  = reactive({
    email: "",
    password: ""
});



const handleSignIn = async () => {
  try {
    errMessage.value = ''
    console.log(form)
    await authStore.signInUser(form.email, form.password)
    router.push({ name: APP_ROUTE_NAMES.HOME })
  } catch (err) {
    errMessage.value = err.message
    showError(err.message)
  }
}
</script>
