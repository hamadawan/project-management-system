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
                        {{  bug.title }}
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
                        <h5>Bug Details</h5>
                        <v-textarea
                            outlined
                            name="input-7-4"
                            label="Bug Details"
                            v-text="bug.details"
                            disabled
                        ></v-textarea> 

                        <h5 class="mt-5">Developer</h5>
                        <div>
                            <v-card-title>
                               Name: {{developer.name}}
                            </v-card-title>
                        </div>
                        <h5 class="mt-5">QA's</h5>
                        <div>
                            <v-card-title>
                                Name: {{qa.name}}
                            </v-card-title>
                        </div>
                        <v-radio-group
                            v-model="status"
                            row
                        >
                            <v-radio v-for="opt in options"
                                v-bind:key="opt"
                                :label="opt"
                                :value="opt"
                            ></v-radio>
                            
                        </v-radio-group>
                    
                        <v-btn
                            class="mx-1 mt-3"
                            color="primary"
                            v-on:click="updateBugStatus()"
                            >
                            Update Status
                        </v-btn>
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
                status: '',
                options:['New', 'In-Progress','Resolved']
            }
        )
    },
    components:{
    },
    computed:{
        bug: function(){
            return this.$store.state.bug
        },
        user: function(){
            return this.$store.state.user
        },
        developer: function(){
            return this.$store.state.developer
        },
        qa: function(){
            return this.$store.state.qa
        }
    },
    methods:{
       
        goToCreateBug: function(){
            this.$store.dispatch("goToCreateBug")
        },
        updateBugStatus: function(){
            this.$store.dispatch("updateBugStatus",this.status)
        }
    },
    created(){
        this.status = this.$store.state.bug.status
    }
}
</script>

<style scoped>
    
</style>
