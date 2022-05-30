<template>
  <LogoutConfirm v-if="showLogoutConfirmationPopup"/>
  <Alert v-if="showAlert" type="info"/>
  <Alert v-if="!isOnline" type="net_err"/>
  <Menu/>
  <router-view/>
</template>

<script>

import Menu from './components/Menu.vue'
import Alert from './components/Alert.vue'
import LogoutConfirm from './components/LogoutConfirm.vue'
import { mapState } from 'vuex';

export default {
    computed: mapState(['alert', 'showLogoutConfirmationPopup']),
    data() {
        return {
            showAlert: false,
            isOnline: navigator.onLine ? true : false,
        }
    },
    components: {
        Menu, Alert, LogoutConfirm
    },
    watch: {
        alert (newAlert, oldAlert) {
            if (newAlert) {
                this.showAlertForNSecs(3)
            }
        }
    },
    created() {
        let refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken !== undefined && refreshToken !== null && refreshToken !== '') {
            this.$store.dispatch("refreshTokensAction", refreshToken).catch((err) => console.log(err))
        }
    },
    
    methods: {
        showAlertForNSecs(n) {
            this.showAlert = true
            setTimeout(() => {
                this.showAlert = false
            }, n * 1000)
        },
        setBg() {
            const bgsection = document.querySelector('body')
            bgsection.style.background = ''
            bgsection.style.backgroundColor = '#e4eaed'
        }
    },
    mounted() {
        window.addEventListener('online', ()=>{this.isOnline=true});
        window.addEventListener('offline', ()=>{this.isOnline=false});
        this.setBg()
    }
}

</script>

<style scoped>

</style>
