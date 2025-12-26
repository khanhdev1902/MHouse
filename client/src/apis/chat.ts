import axios from 'axios'

const API_URL = 'http://localhost:3000/api/chats'

export const getAllChats = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createChat = async (data: { userId: number; message: string }) => {
  const res = await axios.post(API_URL, data)
  return res.data
}
