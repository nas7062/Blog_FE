import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_API_URL

export const createPost = async data => {
  const response = await axios.post(`${API_URL}/createpost`, data)
  return response.data
}

export const getAllPost = async (page = 0, limit = 3) => {
  const response = await axios.get(`${API_URL}/postlist`, {
    params: { page, limit },
  })
  return response.data
}

export const getByIdPost = async postId => {
  const response = await axios.get(`${API_URL}/post/${postId}`)
  return response.data
}

export const deletePost = async postId => {
  const response = await axios.delete(`${API_URL}/post/${postId}`)
  return response.data
}

export const updatePost = async (postId, postData) => {
  const response = await axios.put(`${API_URL}/post/${postId}`, postData)
  return response.data
}

export const toggleLike = async postId => {
  const response = await axios.post(`${API_URL}/like/${postId}`)
  return response.data
}
