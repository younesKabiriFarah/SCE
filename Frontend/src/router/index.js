import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SobreNosotros from '../views/SobreNosotros.vue'
import CartPage from '../views/CartPage.vue'
import ProductSection from '../views/ProductSection.vue'
import Test from '../views/Test.vue'
const routes = [
 
  {
    path: '/',
    name: 'Home',
    redirect :'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component:Home
  },
  {
    path: '/sobre-nosotros',
    name: 'SobreNosotros',
    component:SobreNosotros
  },
  {
    path: '/details/:id',
    name: 'details',
    component: ProductSection
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component : Test
  }

]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes
})



export default router
