import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import AddProject from '../views/AddProject.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import CreateBug from '../views/CreateBug.vue'
import BugDetails from '../views/BugDetails.vue'
import {auth, usersCollection} from '../firebase/firebase'
import store from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/AddProject",
    name: "AddProject",
    component: AddProject,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/ProjectDetails",
    name: "ProjectDetails",
    component: ProjectDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/CreateBug",
    name: "CreateBug",
    component: CreateBug,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/BugDetails",
    name: "BugDetails",
    component: BugDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(async (user) => {

    var authenticatedUser = user;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && authenticatedUser == null)
    {
      store.commit("logout")
      next('/login')
    } 
    else if(requiresAuth && authenticatedUser != null)
    {
      var userData = await usersCollection.doc(user.uid).get()
      authenticatedUser = userData.data()
      store.dispatch("setUser", authenticatedUser)
      if(to.path == '/AddProject' && authenticatedUser.role != 'Manager')
      {
        next("notFound")
      }
      else if(to.path == '/CreateBug'  && authenticatedUser.role != 'QA')
      {
        next("notFound")
      }
      else if(to.path == '/BugDetails'  && (authenticatedUser.role != 'QA' &&  authenticatedUser.role != 'Developer' ))
      {
        next("notFound")
      }
      next()
    } 
    else {
      next()
    }

  });
  
  
});

export default router;