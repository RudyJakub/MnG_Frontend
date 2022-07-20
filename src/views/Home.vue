<template>
<div id="bg">
      <footer @click="redirectToBoard" id="mainFooter">
          <div class="container">
              <h1>{{ title }}</h1>
              <p>{{ description }}</p>
              <div id="tip">
                  <p>Kliknij aby przejść dalej</p>
              </div>
          </div>
      </footer>
</div>
</template>

<script>

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAPI } from '../axios-api'
import { firebaseConfig } from '../firebase-config'

export default {
  name: 'Home',
  data() {
    return {
      title: 'MnG',
      description: 'Powiadomienia'
    }
  },
  computed: {
    name() {
      return this.$store.state.username
    },
    authToken() {
      return this.$store.state.accessToken
    }
  },
  methods: {
    saveNotificationToken (token) {
        const payload = {
          registration_id: token, type: "web"
        }
        getAPI.post('fcm/devices/', payload, {
                    headers: { 'Authorization': 'Bearer ' + this.authToken }
        })
        .then(response => {
          console.log("FIREBASE TOKEN: Token zapisany!")
        })
        .catch(error => {
          console.log('FIREBASE TOKEN: Nie można zapisać tokena.')
          if (error.response) {
            console.log(error.response.status)
            if (error.response.data.registration_id) {
              for (let err of error.response.data.registration_id) {
                console.log(err)
              }
            } else {
              console.log('FIREBASE TOKEN: Backend nie zwrócił szczegółowego błędu.')
            }
          } else if (error.request) {
            console.log('FIREBASE TOKEN: Problem z połączeniem.')
          } else {
            console.log(error.message)
          }
        })
    },
    loadBgImg() {
      const bgsection = document.querySelector('body')
      return new Promise((resolve, reject) => {
        getAPI.get('/get-latest-homepage-image')
        .then((res) => {
          bgsection.style.background = 'center center no-repeat fixed url(http://localhost:8000/media/'+res.data.img+')'
          if (res.data.title) {
            this.title = res.data.title
          }
          if (res.data.description) {
            this.description = res.data.description
          }
          resolve()
        }).catch((err) => {
          bgsection.style.backgroundColor = '#e4eaed'
          console.log(err)
          reject(err)
        })
      })
    },
    destroyBgImg() {
      const bgsection = document.querySelector('body')
      bgsection.style.background = ''
      bgsection.style.backgroundColor = '#e4eaed'
    },
    redirectToBoard() {
      this.$router.push('/powiadomienia')
    }
  },
  mounted() {
    this.loadBgImg()
    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: 'BFn1QijP-o3ZPyyEyED-BJTe0O-UNCpdq7bjf03aUZM3udmcVKYltXy-e0aefFFwBV9LuCb3cqd_Z7nHuNW6wuM' }).then((currentToken) => {
      if (currentToken) {
        this.saveNotificationToken(currentToken)
      } else {
        alert("Zezwól na wysyłanie powiadomień")
        console.log('FIREBASE TOKEN: Generowanie nowego tokena.');
      }
    }).catch((err) => {
      console.log('FIREBASE TOKEN: Nieznany błąd.', err);
    });
  },
  beforeUnmount() {
    this.destroyBgImg()
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
}

body{
  background-repeat: no-repeat;
}

h1{
    font-weight: 500;
    font-size: 24px;
    font-weight: 300;
    margin: 10px 0;
}
p{
    font-size: 18px;
    font-weight: 200;
}

#mainFooter{
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 150px;
    backdrop-filter: blur(10px) brightness(60%);
    color: #fff;
}

#mainFooter, x:-moz-any-link {
    background-color: rgba(0,0,0,.2);
}

.container{
    width: 90%;
    margin-left: 5%;
    height: 100%;
}
#tip{
    position: fixed;
    bottom: 5px;
    right: 10px;
    opacity: .7;
    font-weight: 200;
}
</style>
