<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="APP_ROUTE_NAMES.HOME">Navbar</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" :to="APP_ROUTE_NAMES.HOME"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="APP_ROUTE_NAMES.PRODUCT_LIST">Products</router-link>
          </li>
        </ul>
        <ul class="d-flex navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-laptop"></i>
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('light')">
                  <i class="bi bi-brightness-high"></i> &nbsp; Light
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('dark')">
                  <i class="bi bi-moon-stars-fill"></i> &nbsp; Dark
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="APP_ROUTE_NAMES.LOGIN">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="APP_ROUTE_NAMES.SIGNUP">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useThemeStore } from '@/stores/themeStore'
import { useRoute, RouterLink } from 'vue-router'

const router = useRoute()
console.log('router is ', router)
const themeStore = useThemeStore()
</script>
