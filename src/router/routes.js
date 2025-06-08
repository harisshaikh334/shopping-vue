import { createRouter, createWebHistory } from 'vue-router'
import AccessDenied from '@/views/auth/AccessDenied.vue'
import NotFound from '@/views/auth/NotFound.vue'
import Login from '@/views/auth/Login.vue'
import SignUp from '@/views/auth/SignUp.vue'
import Home from '@/views/home/Home.vue'
import ContactUs from '@/views/home/ContactUs.vue'
import ProductList from '@/views/product/ProductList.vue'
import ProductDetail from '@/views/product/ProductDetail.vue'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: Home,
    },
    {
      path: '/login',
      name: APP_ROUTE_NAMES.LOGIN,
      component: Login,
    },
    {
      path: '/register',
      name: APP_ROUTE_NAMES.SIGNUP,
      component: SignUp,
    },
    {
      path: '/contact-us',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/not-found',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/access-denied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/product-list',
      name: APP_ROUTE_NAMES.PRODUCT_LIST,
      component: ProductList,
    },
    {
      path: '/product-detail',
      name: APP_ROUTE_NAMES.PRODUCT_DETAILS,
      component: ProductDetail,
    },
  ],
})

export default router
