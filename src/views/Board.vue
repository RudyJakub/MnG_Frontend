<template>

    <main>
        <NotifPop :notif="notifs.find(n => n.id === currentID)" @hide="hidePop" v-if="show"/>
        <div class="notificationsContainer">
            <div v-for="notif in notifs" :key="notif.id" class="notification">
                <Notification :notif="notif" @click="notifPop(notif.id)"/>
                <div class="divider"></div>
            </div>
        </div>
    </main>
</template>

<script>

import { getAPI } from '../axios-api'
import Notification from '../components/Notification.vue'
import NotifPop from '../components/NotifPop.vue'

export default {
    name: "Board",
    components: {
        Notification, NotifPop
    },
    data() {
        return {
            notifs: [],
            show: false,
            currentID: 0
        }
    },
    methods: {
        getUserNotif(token) {
            return new Promise((resolve, reject) => {
                getAPI.get('/notifications', {
                headers: { 'Authorization': 'Bearer ' + token }
                })
                .then(res => {
                    this.notifs = res.data
                    this.cacheNotifData(res.data)
                    resolve()
                })
                .catch(err => {
                    this.notifs = JSON.parse(localStorage.getItem("notifications"))
                    reject(err)
                })
            })
        },
        notifPop(id) {
            this.currentID = id
            this.show = true
        },
        hidePop() {
            this.show = false
        },
        cacheNotifData(data) {
            localStorage.setItem("notifications", JSON.stringify(data))
        }
    },
    mounted() {
        if (!localStorage.getItem("accessToken")) {
            console.log("Nie jesteś zalogowany")
            this.$router.push('/logowanie')
        }
        this.getUserNotif(localStorage.getItem("accessToken"))
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

    .notificationsContainer{
        cursor: pointer;
        overflow-y: scroll;
        position: fixed;
        display: inline-block;
        width: 100%;
        height: calc(100vh - 62px);
        bottom: 0;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .notificationsContainer::-webkit-scrollbar{
        display: none;
    }

    .divider{
        height: 1px;
        width: 94%;
        margin: auto;
        background-color: #232a34;
        opacity: .2;
    }

    .notOpened{
        background-color: #f9fbff;
    }
</style>
