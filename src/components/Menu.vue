<template>
  <nav role="navigation">
    <div id="menuToggle">
        <input id="input" type="checkbox">
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu">
          <div v-on:click="hideMenu">
            <router-link to="/"><a href="#"><li><b style="font-size: 40px;">MnG</b></li></a></router-link>
          </div>
          <div v-on:click="hideMenu">
            <router-link to="/powiadomienia"><a href="#"><li>Tablica</li></a></router-link>
          </div>
          <div v-on:click="hideMenu">
            <router-link to="/konto"><a href="#"><li>Konto</li></a></router-link>
          </div>
          <div v-on:click="hideMenu">
            <router-link to="/informacje"><a href="#"><li>Informacje</li></a></router-link>
          </div>
          <div v-if="!authenticated" v-on:click="hideMenu">
            <router-link to="/logowanie"><a href="#"><li>Zaloguj</li></a></router-link>
          </div>
          <div v-else v-on:click="hideMenu">
            <a v-on:click="showConfirmation" href="#"><li>Wyloguj</li></a>
          </div>
        </ul>
    </div>
  </nav>
</template>

<script>

import { mapState } from "vuex"

export default {
  name: "Menu",
  computed: {
    ...mapState(["accessToken"]),
    authenticated() {
      return this.accessToken !== undefined && this.accessToken !== '' && this.accessToken !== null
    },
  },
  methods: {
    showConfirmation() {
      this.$store.state.showLogoutConfirmationPopup = true
    },
    redirect() {
      this.$router.push("/")
    },
    hideMenu() {
      document.getElementById("input").checked = false;
    }
  }
}

</script>



<style scoped>

*{
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  html{
    scroll-behavior: smooth;
  }
  
  body{
    background-color: #edeff3;
  }

 #menuToggle{
            display: block;
            position: fixed;
            right: 20px;
            top: 20px;
            -webkit-user-select: none;
            user-select: none;
            z-index: 1;
        }


        #menuToggle input{
            z-index: 2;
            opacity: 0;
            cursor: pointer;
            display: block;
            -webkit-touch-callout: none;
            width: 40px;
            height: 32px;
            position: absolute;
            top: -7px;
            left: -5px;
        }


        #menuToggle span{
            display: block;
            width: 33px;
            height: 4px;
            margin-bottom: 5px;
            position: relative;
            background-color: #232a34;
            z-index: 1;
        
            transform-origin: 4px 0px;
            
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.5s ease;
        }


        #menuToggle span:first-child{
            transform-origin: 0% 0%;
        }
        
        #menuToggle span:nth-last-child(2){
            transform-origin: 0% 100%;
        }
        #menuToggle input:checked ~ span{
            opacity: 1;
            transform: rotate(45deg) translate(-2px, -1px);
        }
        #menuToggle input:checked ~ span:nth-last-child(2){
            transform: rotate(-45deg) translate(0, -1px);
            }
        #menuToggle input:checked ~ span:nth-last-child(3){
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
        }


        #menu
        {
            position: fixed;
            width: 250px;
            top: 0;
            right: -250px;
            height: 100vh;
            padding: 100px 0 0 0px;
            display: flex;
            flex-direction: column;

            
            background: #f9fbff;
            box-shadow: #777 25px 0 50px;
            list-style-type: none;
            -webkit-font-smoothing: antialiased;
            
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        }
        #menu a{
            color: #111;
            text-decoration: none;
            font-size: 18px;
            
        }
        #menu li{
            padding: 15px 40px;
            border-bottom: solid 1px hsla(0, 0%, 0%, .1);
        }

        #menuToggle input:checked ~ ul{
            transform: translateX(-100%);
        }
      #confirmContainer{
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