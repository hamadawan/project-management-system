<template>
  <div>
    <div v-if="user.role === 'Manager' ">
      <v-btn class="ml-15 mb-5" v-on:click="goToAddProject()">ADD PROJECT</v-btn>
    </div>
    <v-container class=" lighten-5">
      <v-row no-gutters>
        <v-col
          v-for="(project , index) in projects"
          :key="project.title"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card 
            class="mx-auto mt-3"
            max-width="250"
          
          >
          <v-img
            src="https://source.unsplash.com/random"
            height="100px"
          ></v-img>

          <v-card-title>
            {{project.title}}
          </v-card-title>

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              v-on:click="setProject(index)"
            >
              Details
            </v-btn>

            <v-spacer></v-spacer>

          </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
    components:{
    },
    computed:{
      projects: function(){
        return this.$store.state.projects
      },
      user: function()
      {
        return this.$store.state.user
      }
    },
    methods:{
      goToAddProject: function(){
        this.$store.dispatch("goToAddProject")
      },

      setProject:function(index){
        this.$store.dispatch("setProject",index)
      }
    },
    created()
    {
      this.$store.dispatch("fetchProjects")
    }
}
</script>

<style>

</style>
