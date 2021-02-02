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
                        Fill the Following Form
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
                        <v-text-field v-model="title" label="Project Title"></v-text-field>
                        <v-textarea
                            v-model="details"
                            outlined
                            name="input-7-4"
                            label="Project Details"
                        ></v-textarea>        
                        <v-select 
                            v-model="valueDevelopers"
                            :items="developers"
                            item-text="name"
                            item-value="uid"
                            label="Developers"
                            
                            multiple
                            outlined
                            :loading="loading"
                        ></v-select>
                        
                        <v-select 
                            
                            v-model="valueQAs"
                            :items="QAs"
                            item-text="name"
                            multiple
                            label="QA's"
                            item-value="uid"

                            outlined
                            :loading="loading"
                        >
                            
                        </v-select>
                        
                        <v-btn
                            class="mx-1"
                            color="primary"
                            v-on:click="submit()"
                            >
                            Save
                        </v-btn>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return{
            title: '',
            details:'',
            valueDevelopers: [],
            valueQAs: [],
        }
    },
    components:{
    },
    computed:{ 
        developers: function()
        {
            return this.$store.state.developers
        },
        QAs: function()
        {
            return this.$store.state.qas
        },
        loading: function()
        {
            return this.$store.state.loading
        }
    },
    methods:{
        submit(){
            if(this.title == '' || this.details =='')
            {
                alert("Fields cannot be empty!")
            }
            else{
                this.$store.dispatch("addProject",{
                    title: this.title,
                    details: this.details,
                    developers: this.valueDevelopers,
                    qas: this.valueQAs
                })
            }
        }
    }
}
</script>

<style scoped>
   
</style>
