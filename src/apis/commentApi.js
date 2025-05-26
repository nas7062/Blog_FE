import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_API_URL

export const createComment = async commentData => {
  const response = await axios.post(`${API_URL}/comments`, commentData)
  return response.data
}

export const getComment = async postId => {
  const response = await axios.get(`${API_URL}/comments/${postId}`)
  return response.data
}
