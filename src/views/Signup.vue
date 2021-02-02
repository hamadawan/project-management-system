<template>
    <div class="vue-signup">
        <div v-if="error.isError">
            <h4>
                {{error.message}}
            </h4>
            <button v-on:click="removeError()">Ok</button>
        </div>
        <div v-if="!error.isError">
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" v-model="name" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Role</label>
                <select v-model="role" class="form-control form-control-lg">
                    <option disabled value="">Please select one</option>
                    <option>Manager</option>
                    <option>QA</option>
                    <option>Developer</option>
                </select>
            </div>
            <button v-on:click="submit()" class="btn btn-dark btn-lg btn-block">Sign Up</button>
            <p class="forgot-password text-right">
                Already registered 
                <router-link to="/login">sign in?</router-link>
            </p>
        </div>
    </div>
</template>

<script>

export default {
    data()
    {
        return {
            name:'',
            email:'',
            password:'',
            role:'',
        }
    },

    components:{
    },

    computed:{
        error:function(){
            return this.$store.state.error
        }
    },

    methods:{
        submit(){
            this.$store.dispatch("signup",{
                name:this.name,
                email: this.email,
                password: this.password,
                role: this.role
            })
        },
        removeError(){
            this.$store.dispatch("setError",{ isError: false, message:''})
        }
    }
}
</script>

<style scoped>
    .vue-signup {
        width: 450px;
        background: #ffffff;
        box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
        padding: 10px 35px 15px 35px;
        border-radius: 15px;
        transition: all .3s;
        margin: 0 auto;
    }
</style>
