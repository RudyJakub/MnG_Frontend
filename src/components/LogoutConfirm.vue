<template>
      <div id="confirmContainer">
        <p>Czy na pewno chcesz się wylogować?</p>
        <div class="buttonBox">
            <button v-on:click="handleLogout" type="submit">Tak</button>
            <button v-on:click="hideConfirmation" type="submit">Nie</button>
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex"
import { logout } from '../auth'

export default {
  name: "LogoutConfirm",
  computed: {
    ...mapState(["accessToken"]),
    authenticated() {
      return this.accessToken !== undefined && this.accessToken !== '' && this.accessToken !== null
    },
  },
  methods: {
    handleLogout() {
      logout(this.accessToken).then(() => {
        this.$store.state.alert = "Wylogowano"
        this.$router.push("/")
      }).catch((err) => {
        console.log(err)
        this.$router.push("/")
      })
      this.hideConfirmation()
    },
    hideConfirmation() {
      this.$store.state.showLogoutConfirmationPopup = false
    }
  }
}

</script>


<style>
*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }
  
  html{
    scroll-behavior: smooth;
  }
  
  body{
    background-color: #edeff3;;
  }

  #confirmContainer{
    z-index: 99999999;
    position: fixed;
    background-color: #f9fbff;


    width: 350px;
    height: 200px;

    top: calc(50% - 100px);
    left: calc(50% - 175px);

    box-shadow: #777 3px 3px 5px;
    border-radius: 5px;
  }

  #confirmContainer p{
    font-weight: 300;
    font-size: 26px;
    text-align: center;
    margin-top: 24px;
  }

  .buttonBox button{
    padding: 10px 50px; 
    border: #232a34 solid 1px;
    background-color: #f9fbff;
    font-size: 18px;
  }

  .buttonBox{
    display: flex;
    height: 112px;
    margin: 0 20px;
    justify-content: space-around;
    align-items: center;
  }
</style>