import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index'
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2)


Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignUp')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/bar',
    name: 'bar',
    component: () => import('../components/Bar')
  },
  {
    path: '/line',
    name: 'line',
    component: () => import('../components/Line')
  },
  {
    path: '/pie',
    name: 'pie',
    component: () => import('../components/Pie')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../components/Map')
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../components/Data'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dataDate',
    name: 'data date',
    component: () => import('../components/DataDate'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/maps',
    name: 'data map',
    component: () => import('../components/DataMap'),
    meta: {
      requiresAuth: true
    }
  },



]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {


  if (to.matched.some(record => record.meta.requiresAuth)) {

    // this route requires auth, check if logged in
    if (localStorage.getItem('Authorization')) {
      console.log(localStorage.getItem('Authorization'))
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      }
      try {
        const { data: { valid } } = await axios.post('http://localhost:3000/api/users/check', {}, {
          headers
        })
        //check if token still valid (in some case token could expire)
        if (!valid) {
          alert('Seem your token is invalid please login again')
          localStorage.removeItem("email");
          localStorage.removeItem("Authorization");
          router.push('/login')
        } else {
          next()
        }
      } catch (error) {
        console.log(error)
      }
      //seting up req.headers with axios need to pass object req.body as 2nd parameter and object headers as 3th parameter, if you forget to put second parameter, server will send response error!

    } else {
      router.push('/')
    }

  } else {
    next()
  }
})

export default router
