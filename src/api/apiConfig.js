import axios from 'axios'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

const API_URL = process.env.REACT_APP_ENVIRONMENT === "development" ?
                process.env.REACT_APP_LOCAL_API_URL :
                'http://<my hosted production api url>'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY)
  config.headers.Authorization = token
  return config
})

export default api