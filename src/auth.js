import { getAPI } from './axios-api'
import store from './store'
import router from './router'


function register(credentials) {
    return new Promise((resolve, reject) => {
        getAPI.post('/accounts/register', {
            "username": credentials.username,
            "email": credentials.email,
            "password": credentials.password,
        }).then((res) => {
            login({
                "username": credentials.username,
                "password": credentials.password
            }).then(() => router.push("/"))
            resolve()
        }).catch(err => {reject(err)})
    })
}

function login(credentials) {
    return new Promise((resolve, reject) => {
        getAPI.post('/accounts/token', {
            "username": credentials.username,
            "password": credentials.password,
        }).then(res => {
            getUserData(res.data.access)
            store.commit('updateTokens', {
                accessToken: res.data.access,
                refreshToken: res.data.refresh
            })
            resolve()
        }).catch(err => {reject(err)})
    })
}

function logout(accessToken) {
    let refr = localStorage.getItem("refreshToken")
    let data = { refreshToken: refr }
    store.commit('destroyUserData')
    store.commit('destroyTokens')
    return new Promise((resolve, reject) => {
        getAPI.post('/accounts/logout', data, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(res => { resolve()
        }).catch(err => {reject(err)})
    })
}

function getUserData(accessToken) {
    return new Promise((resolve, reject) => {
        getAPI.get('/accounts/current-user', {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then(res => {
            store.commit('updateUserData', {
                username: res.data.username,
                email: res.data.email
            })
            resolve()
        }).catch(err => {reject(err)})
    })
}

export { register, login, logout, getUserData }
