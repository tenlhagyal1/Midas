import api from './apiConfig'

const LOCALSTORAGE_KEY = process.env.REACT_APP_LOCALSTORAGE_KEY

export async function signin(username, password) {
  // Make request to singin user to retrieve a token
  const response = await api.post('/auth/signin', {
      username, password
  })

  // Put the token on localstorage, for 30min (duration set in server)
  console.log('Data Token:', response.data.token)
  console.log('User ID:', response.data.userId)
  console.log('User Balance:', response.data.userBalance)
  if (response.data) {
    localStorage.setItem(LOCALSTORAGE_KEY, response.data.token)
    localStorage.setItem('user', response.data.userId);
    localStorage.setItem('userBalance', response.data.userBalance);
  }


  return response.data
}

console.log(LOCALSTORAGE_KEY)

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

export function logout() {
    // Remove the token from localstorage
    localStorage.removeItem(LOCALSTORAGE_KEY);
    // Optionally, you can also reset any user state in your application here
    // or redirect the user to the login page.
  }