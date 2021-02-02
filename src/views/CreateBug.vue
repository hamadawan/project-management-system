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
                        Provede Following Information about Bug!
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
                        <v-text-field v-model="title" label="Bug Title"></v-text-field>
                        <v-textarea
                            v-model="details"
                            outlined
                            name="input-7-4"
                            label="Bug Details"
                        ></v-textarea>        
                        <v-select 
                            v-model="developer"
                            :items="developers"
                            item-text="name"
                            item-value="uid"
                            label="Select Developer"
                            outlined
                            :loading="loading"
                        ></v-select>
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
            developer: '',
            status: '',
            options:['New', 'In-Progress']

        }
    },
    components:{
    },
    computed:{ 
        developers: function()
        {
            return this.$store.state.developers
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
                this.$store.dispatch("addBug",{
                    title: this.title,
                    details: this.details,
                    status: this.status,
                    did: this.developer,
                    qid: this.$store.state.user.uid,
                    pid: this.$store.state.project.pid,
                })
            }
        }
    }
}
</script>

<style scoped>
   
</style>
