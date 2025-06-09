<template>
     <div class="container py-5 my-3">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border rounded">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Create Account</h4>
            <form v-on:submit.prevent="handleSubmit()">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" required />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Create Account
              </button>
              <div v-if="errMessage" class="alert alert-danger mt-3 mb-0">{{errMessage}}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Already have an account?
              <routerLink :to="APP_ROUTE_NAMES.LOGIN">Login here</routerLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSwal } from '@/utility/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { userAuthStore } from '@/stores/authStore'
const {showSuccess, showError} = useSwal();

const errMessage = ref();
const loading = ref(false);
const form  = reactive({
    email: "",
    password: ""
});
const authStore = userAuthStore();
const router = useRouter();

const handleSubmit = async () => {
    loading.value = true;
    errMessage.value = "";
    authStore.signUpUser(form.email, form.password).then(() => {
      showSuccess("User registered successfully.");
      loading.value = false;
      router.push({name: APP_ROUTE_NAMES.LOGIN});
    }, (err) => {
      
      showError("Something went wrong.");
      console.log(err.message);
      errMessage.value = err.message;
      loading.value = false;
    })
    
    
}

</script>