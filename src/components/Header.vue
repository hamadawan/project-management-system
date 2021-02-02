<template>
   <div class="vue-header">    
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="/" >
           Project Management System
        </a>
        <ul v-if="!isLoggedIn" class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/signup">Sign up</router-link>
          </li>
        </ul>
        <ul v-if="isLoggedIn" class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <div class="nav-link pr-3" >{{user.name}}</div>
          </li>
          <li class="nav-item">
            <div class="nav-link pr-3" >{{user.role}}</div>
          </li>
          <li class="nav-item">
            <div v-on:click="logout()" class="btn btn-outline-primary" >Logout</div>
          </li>
        </ul>
        
      </div>
    </nav>
   </div>
</template>

<script>

export default {
    components:{
    },
    computed:{
      isLoggedIn:function()
      {
        return this.$store.state.login
      },
      user:function()
      {
        return this.$store.state.user
      }
    },
    methods:{
      logout(){
        this.$store.dispatch("logout")
      }
    }

}
</script>

<style scoped>
  .vue-header{
    margin-bottom: 90px;
  }  
</style>
