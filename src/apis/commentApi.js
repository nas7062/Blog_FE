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

export const deleteComment = async commentId => {
  const response = await axios.delete(`${API_URL}/comments/${commentId}`)
  return response.data
}

export const updateComment = async (commentId, editContent) => {
  const response = await axios.put(`${API_URL}/comments/${commentId}`, { editContent })
  return response.data
}
