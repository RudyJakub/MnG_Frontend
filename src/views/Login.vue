<template>
    <div class="mainContainer">
        <h1>Logowanie</h1>
        <div class="smallContainer">
            <form v-on:submit.prevent="handleLogin">
            <label v-if="wrong" style="color: red;">Błędny login lub hasło</label>
            <input type="text" placeholder="Login" v-model="username" required>
            <input type="password" placeholder="Hasło" v-model="password" required>
            <button type="submit">Zaloguj</button>
            <label>
                <p><a href="{{ passwordreseturl }}">Zresetuj hasło</a></p>
            </label>
            <div class="registerInfoContainer">
            <p>Nie masz konta?</p>
            <router-link to="/rejestracja"><p><u>Zarejestruj się!</u></p></router-link>
            </div>
            </form>
        </div>
    </div>
</template>

<script>

import { login, passwordResetURL } from "../auth"

export default {
    name: "Login",
    data () {
        return {
            username: '',
            password: '',
            wrong: false,
            passwordreseturl: passwordResetURL
        }
    },
    methods: {
        handleLogin() {
            login({
                username: this.username,
                password: this.password
            }).then(() => {
                this.$router.push('/')
                console.log("zalogowano")
                this.$store.state.alert = "Zalogowano"
            }).catch(() => {
                this.wrong = true
                console.log("whoops")
            })
        }
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

input[type=text], input[type=password], button{
    background-color: #f9fbff;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 10px 5px;
    margin-bottom: 12px;
    font-size: 18px;
}

button{
    border: #232a34 solid 1px;
}

input[type=text], input[type=password], input[type=email]{
    border: 0;
    border-bottom: 1px #232a34 solid;
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
    border-bottom: 1px solid #232a34;
    box-sizing: border-box;
}

input[type=checkbox]{
    appearance: none;
    background-color: #e4eaed;
    border: 1px solid #232a34;
    height: 16px;
    width: 16px;
    transform: translateY(3px);
}

input[type=checkbox]:checked{
    background-color: #232a34;
}

.registerInfoContainer{
    position: absolute;
    bottom: 20px;
    left: 8vw;
}
</style>