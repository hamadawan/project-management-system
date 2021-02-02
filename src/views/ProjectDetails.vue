<template>
    <div>
        <v-container>
            <v-row justify="space-around">
                <v-col
                    cols="12"
                    md="12"
                >
                    <v-btn
                        class="mx-1"
                        color="primary"
                        >
                        {{  project.title }}
                    </v-btn>
                </v-col>
                <v-col
                    cols="12"
                    md="12"
                >
                    <v-sheet
                        class="pa-12 pl-5 pr-5 pt-3"
                        color=" lighten-3"
                    >
                        <h5>Project Details</h5>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            label="Project Details"
                            v-text="project.details"
                            disabled
                        ></v-textarea> 

                        <h5 class="mt-15">Developers</h5>
                        <v-card>
                            <v-card-title>
                                <v-text-field
                                    v-model="searchDevelper"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-card-title>
                            <v-data-table
                                :headers="headers"
                                :items="developers"
                                :search="searchDevelper"
                            ></v-data-table>
                        </v-card>
                        <h5 class="mt-15">QA's</h5>
                        <v-card >
                            <v-card-title>
                                <v-text-field
                                    v-model="searchQas"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-card-title>
                            <v-data-table
                                :headers="headers"
                                :items="qas"
                                :search="searchQas"
                            ></v-data-table>
                        </v-card>
                        <div class="d-flex justify-space-between" width="100" >
                            <h5 class="mt-15">Bug's</h5>
                            <v-btn 
                                v-if="user.role == 'QA'" 
                                class="mt-12 primary"
                                v-on:click="goToCreateBug()"
                            >Create Bug</v-btn>
                        </div>
                        <v-card >
                            <v-card-title>
                                <v-text-field
                                    v-model="searchBugs"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-card-title>
                            <v-data-table v-if="user.role != 'Manager'"
                                :headers="headersBug"
                                :items="bugs"
                                :search="searchBugs"
                                @click:row="goToBugDetails"
                            ></v-data-table>
                            <v-data-table v-else
                                :headers="headersBug"
                                :items="bugs"
                                :search="searchBugs"
                            ></v-data-table>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

export default {
    data(){
        return (
            {
                searchDevelper: '',
                searchQas:'',
                searchBugs:'',
                headers: [
                  {
                    text: 'Uid',
                    align: 'start',
                    value: 'uid',
                  },
                  { text: 'Name', value: 'name' },
                  { text: 'Role', value: 'role' }
                ],
                headersBug: [
                  {
                    text: 'Uid',
                    align: 'start',
                    filterable: false,
                    value: 'bid',
                  },
                  { text: 'Title', value: 'title' },
                  { text: 'status', value: 'status' }
                ],
            }
        )
    },
    components:{
    },
    computed:{
        project: function(){
            return this.$store.state.project
        },
        user: function(){
            return this.$store.state.user
        },
        developers: function(){
            return this.$store.state.developers
        },
        qas: function(){
            return this.$store.state.qas

        },
        bugs: function(){
            return this.$store.state.bugs
        }
                
    },
    methods:{
        goToBugDetails: function(item, index){
            
            this.$store.dispatch("goToBugDetails",index.index)
        },
        goToCreateBug: function(){
            this.$store.dispatch("goToCreateBug")
        }
    },
    created(){
        this.$store.dispatch("projectDetails")
    }
}
</script>

<style scoped>
    
</style>
