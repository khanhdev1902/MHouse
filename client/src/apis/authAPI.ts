// src/apis/authAPI.ts
import axios from 'axios'

const authAPI = {
  login: (data: { username: string; password: string }) => axios.post('/api/auth/login', data),
}

export default authAPI
