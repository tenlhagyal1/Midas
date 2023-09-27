import api from './apiConfig'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

export async function signin(username, password) {
  const response = await api.post('/auth/signin', {
      username, password
  })

  localStorage.setItem(LOCALSTORAGE_KEY, response.data.token)

  return response.data
}

export async function signup(username, password) {
  const response = await api.post('/auth/signup', {
      username, password
  })

  return response.data
}

export async function isTokenValid() {
  const response = await api.get('/auth/isTokenValid')
  return response.data
}