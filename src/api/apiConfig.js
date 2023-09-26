import axios from 'axios'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

const API_URL = 'https://project3-midas-backend-831586772d51.herokuapp.com/api/'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  config.headers.Authorization = token
  return config
})

export default api