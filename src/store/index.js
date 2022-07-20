import { createStore } from 'vuex'
import { getAPI } from '../axios-api'
import { getUserData } from '../auth'

export default createStore({
  state: {
    accessToken: '',
    username: '',
    email: '',
    alert: '',
    showLogoutConfirmationPopup: false
  },
  mutations: {
    updateTokens(state, data) {
      state.accessToken = data.accessToken
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('accessToken', data.accessToken)
    },
    updateUserData(state, data) {
      state.username = data.username
      state.email = data.email
      localStorage.setItem('username', data.username)
      localStorage.setItem('email', data.email)
    },
    destroyTokens(state) {
      state.accessToken = ''
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
    },
    destroyUserData(state) {
      state.username = ''
      state.email = ''
      localStorage.removeItem('username')
      localStorage.removeItem('email')
    },
    updateUsername(state, data) {
      state.username = data.username
    },
    updateEmail(state, data) {
      state.email = data.email
    }
  },
  getters: {
    isAuthenticated(state) {
      return Boolean(state.accessToken)
    },
    getToken(state) {
      return state.accessToken
    }
  },
  actions: {
    refreshTokensAction (context, token) {
      return new Promise((resolve, reject) => {
        getAPI.post('/accounts/token/refresh', { refresh: token })
        .then((res) => {
          context.commit("updateTokens", {
            accessToken: res.data.access,
            refreshToken: res.data.refresh
          })
          getUserData(context.state.accessToken)
          resolve()
        }).catch((err) => {
          console.log(err)
          if (err.response.status === 401) {
            context.commit("destroyTokens")
            context.commit("destroyUserData")
            this.$router.push("/")
          }
          reject(err)
        })
      })
    }
  }
})
