<template>
    <div class="inner-block">
        <div v-if="error.isError">
            <h4>
                {{error.message}}
            </h4>
            <button v-on:click="removeError()">Ok</button>
        </div>
        
        <div v-if="!error.isError">
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>

            <button v-on:click="submit()" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 ">
                <router-link to="/signup">Signup here.</router-link>
            </p>
            <p class="forgot-password text-right mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },

    computed:{
        error:function(){
            return this.$store.state.error
        }
    },

    methods:{
        submit(){
            this.$store.dispatch("login",{
                email: this.email,
                password: this.password,
            })
        },
        removeError(){
            this.$store.dispatch("setError",{ isError: false, message:''})
        }
    }
}

</script>

<style scoped>
    .inner-block {
        width: 450px;
        background: #ffffff;
        box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
        padding: 40px 55px 45px 55px;
        border-radius: 15px;
        transition: all .3s;
        margin: 0 auto;
    }

</style>
 