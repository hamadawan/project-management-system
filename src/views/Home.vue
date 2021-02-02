<template>
    <div>
       
            <dashboard-manager  ></dashboard-manager>
            <!-- <dashboard-qa v-if="getUser.role == 'QA'" ></dashboard-qa>
            <dashboard-developer v-if="getUser.role == 'Developer'" ></dashboard-developer> -->

    </div>

</template>

<script>
import Dashboard_Manager from '../views/Dashboard_Manager'
// import Dashboard_QA from '../views/Dashboard_QA'
// import Dashboard_Developer from '../views/Dashboard_Developer'

export default {
    components:{
        'dashboard-manager': Dashboard_Manager,
        // 'dashboard-qa': Dashboard_QA,
        // 'dashboard-developer': Dashboard_Developer
    },
    computed:{
      isLoggedIn:function()
      {
        return this.$store.state.login
      },
      getUser: function()
      {
          return this.$store.state.user
      }
    }
    
}
</script>

<style scoped>
    .vue-home {
        width: 450px;
        background: #ffffff;
        box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
        padding: 40px 55px 45px 55px;
        border-radius: 15px;
        transition: all .3s;
        margin: 0 auto;
    }
</style>
