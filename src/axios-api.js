import axios from 'axios'

let url = 'http://localhost:8000/api/'

if (process.env.NODE_ENV === 'production') {
    url = 'https://api.miastonagorze.pl/api/'
}

const getAPI = axios.create({
    baseURL: url,
    timeout: 5000
})

export { getAPI, url }
