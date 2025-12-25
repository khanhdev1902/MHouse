// src/apis/authAPI.ts
import http from './httpClient'
const authAPI = {
  login: (data: { username: string; password: string }) => http.post('/auth/login', data),
}

export default authAPI
