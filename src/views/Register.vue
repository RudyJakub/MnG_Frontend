<template>
    <div class="mainContainer registerContainer">
        <h1>Rejestracja</h1>

        <div class="smallContainer">
            <form v-on:submit.prevent="handleRegistration">
            <p v-if="emailorusernametaken" style="color: red;">Login lub email jest już zajęty</p>
            <input type="email" placeholder="Adres e-mail" v-model="email" name="email" required>
            <input type="text" placeholder="Nazwa użytkownika" v-model="username" name="username" required>
            <input type="password" placeholder="Hasło" v-model="password" name="password" required>
            <p v-if="passwordTooShort" style="color: red;">Hasło musi zawierać conajmniej 8 znaków</p>
            <button type="submit">Zarejestruj</button>
            <router-link to="/logowanie"><p id="loginBtn"><u>Logowanie</u></p></router-link>
            </form>
        </div>
    </div>
</template>

<script>

import { register } from "../auth";

export default {
    name: "Register",
    data () {
        return {
            username: '',
            email: '',
            password: '',
            emailorusernametaken: false
        }
    },
    methods: {
        handleRegistration() {
            if (!this.passwordTooShort) {
                register({
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then((res) => {
                    console.log(res)
                    this.$store.state.alert = "Zarejestrowano"
                }).catch((err) => {
                    this.emailorusernametaken = true
                    console.log(err)})
            }
            this.clearData()
        },
        clearData() {
            this.username = ''
            this.email = ''
            this.password = ''
        }
    },
    computed: {
        passwordTooShort: function () {
            if (this.password.length < 8 && this.password.length !== 0) {
                return true;
            } else {
                return false;
            }
        },
    },
    mounted() {
        if (localStorage.getItem("accessToken")) {
            console.log("Jesteś już zalogowany")
            this.$router.push('/')
        }
    }
}

</script>

<style scoped>

html{
    scroll-behavior: smooth;
}

*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
}

body{
    background-color: #e4eaed;
}



.mainContainer{
    background-color: #f9fbff;
    width: 94%;
    height: 60vh;
    margin-top: 15vh;
    margin-left: 3%;
    box-shadow: #777 2px 2px 5px;
    position: relative;
    min-height: 450px;
    border-radius: 5px;
}

h1{
    transform: translate(-50%,120%);
    margin-left: 50%;
    text-align: center;
    font-size: 36px;
    width: 100%;
}

input[type=text], input[type=password], input[type=email], button{
    background-color: #f9fbff;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 10px 5px;
    margin-bottom: 12px;
    font-size: 18px;
}

input[type=text], input[type=password], input[type=email]{
    border: 0;
    border-bottom: 1px #444 solid;
}

.smallContainer button{
    cursor: pointer;
    margin-top: 20px;
    
}

label{
    margin-left: 15px;
    margin-top: 10px;
    nav-index: 4;
}

button{
    border: #232a34 solid 1px;
}


.smallContainer{
    width: 86%;
    margin-left: 7%;
    height: 20vh;
    margin-top: 12vh;
    display: flex;
    flex-direction: column;
}


input:focus{
    background-color: #e4eaed;
    outline: 0;
    border-bottom: 1px solid #444;
    box-sizing: border-box;
}

input[type=checkbox]{
    appearance: none;
    background-color: #e4eaed;
    border: 1px solid #444;
    height: 16px;
    width: 16px;
    transform: translateY(3px);
}

input[type=checkbox]:checked{
    background-color: #333;
}

#loginBtn{
    position: absolute;
    bottom: 20px;
    left: 8vw;
    font-size: 18px;
}

</style>