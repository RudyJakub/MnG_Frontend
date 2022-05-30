<template>
    <div class="mainContainer">
        <h1>Twoje konto</h1>
        <div class="smallContainer">
            <div>
                <input type="text" v-model="newUsername" :placeholder="username">
                <button v-on:click="changeUsername" type="submit">Zmień</button>
            </div>
            <div>
                <input type="email" v-model="newEmail" :placeholder="email">
                <button v-on:click="changeEmail" type="submit">Zmień</button>
            </div>
            <a href="{{ passwordreseturl }}"><button id="passwordBtn">Zmień Hasło</button></a>
        </div>
        <br>
        <div>
            <label style="color: red;" id="alertp"></label>
        </div>
    </div>
</template>

<script>

import { getAPI } from '../axios-api'
import { mapState } from "vuex"
import { passwordResetURL } from "../auth"

export default {
  name: "Account",
  data () {
      return {
          newUsername: '',
          newEmail: '',
          passwordreseturl: passwordResetURL
      }
  },
  computed: {
    ...mapState(["username", "email", "accessToken"])
  },
  mounted() {
      if (!localStorage.getItem("accessToken")) {
          console.log("Nie jesteś zalogowany")
          this.$router.push('/logowanie')
      }
  },
  methods: {
      changeUsername() {
        const _newUsername = this.newUsername
        if (_newUsername.length === 0) {
            document.getElementById("alertp").innerText = "Nie podano nowej nazwy użytkownika"
            return
        }
        if (_newUsername.length < 3) {
            document.getElementById("alertp").innerText = "Podana nazwa jest zbyt krótka"
            return
        }
        const token = localStorage.getItem("accessToken");
        return new Promise((resolve, reject) => {
            getAPI.put('/accounts/change-username', {
                "username": _newUsername
            }, {
            headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                this.$store.state.username = _newUsername
                console.log("ZMIANA NAZWY UŻ. zmieniono")
                this.newUsername = ''
                document.getElementById("alertp").style = 'color: green;'
                document.getElementById("alertp").innerText = 'Zmieniono!'
            })
            .catch(err => {
                console.log("ZMIANA NAZWY UŻ. błąd", err)
                if (err.response.status === 400) {
                    document.getElementById("alertp").style = 'color: red;'
                    document.getElementById("alertp").innerText = "Podana nazwa użytkownika jest nieprawidłowa"
                }
            })
        })
      },
      changeEmail() {
        const _newEmail = this.newEmail
        if (_newEmail.length === 0) {
            document.getElementById("alertp").style = 'color: red;'
            document.getElementById("alertp").innerText = "Nie podano nowego emaila"
            return
        }
        const token = localStorage.getItem("accessToken");
        return new Promise((resolve, reject) => {
            getAPI.put('/accounts/change-email', {
                "email": _newEmail
            }, {
            headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                this.$store.state.email = _newEmail
                console.log("ZMIANA EMAIL. zmieniono")
                this.newEmail = ''
                document.getElementById("alertp").style = 'color: green;'
                document.getElementById("alertp").innerText = 'Zmieniono!'
            })
            .catch(err => {
                console.log("ZMIANA EMAIL. błąd", err.response)
                if (err.response.status === 400) {
                    document.getElementById("alertp").style = 'color: red;'
                    document.getElementById("alertp").innerText = "Podany email jest nieprawidłowy"
                }
            })
        })
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
    margin-top: 20vh;
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

input[type=text], input[type=email]{
    background-color: #f9fbff;
    width: 65%;
    box-sizing: border-box;
    padding: 10px 5px;
    margin-bottom: 20px;
    font-size: 16px;
}

button{
    border: #232a34 solid 1px;
    width: 30%;
    background-color: #f9fbff;
    padding: 10px 5px;
    margin-left: 3%;
}

#passwordBtn{
    margin-top: 10px;
    width: 100%;
    margin-left: 0;
}

input[type=text], input[type=email]{
    border: 0;
    border-bottom: 1px #232a34 solid;
}

label{
    margin-left: 15px;
    margin-top: 10px;
    nav-index: 4;
}


.smallContainer{
    width: 90%;
    margin-left: 5%;
    height: 20vh;
    margin-top: 12vh;
    display: flex;
    flex-direction: column;
}


input:focus{
    background-color: #e4eaed;
    outline: none;
    border-bottom: 1px solid #232a34;
    box-sizing: border-box;
}
</style>
