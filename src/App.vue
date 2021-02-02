<template>
  <v-app class="main">

    <app-header></app-header>  
    <!-- Main -->
    <div class="vue-tempalte">
      <router-view />
    </div>
    <app-footer></app-footer>  

  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components:{
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style scoped>
  .vue-tempalte{
    width: 100%;
    height: 100%;
  }
  .main{
    background: #2554FF !important;
    font-weight: 300;
  }
</style>