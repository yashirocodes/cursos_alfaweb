import Vue from 'vue'
import VueRouter from 'vue-router'
import { getAuth } from "firebase/auth"
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path:'/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const sesionActiva = auth.currentUser
  if(sesionActiva && to.path == "/dashboard"){
    next()
  }else if(!sesionActiva && to.path == "/dashboard"){
    alert("lo sentimos, no tienes permisos de estar aquí, porfavor inicia sesion")
    next("/login")
  }else{
    next()
  }
})

export default router
