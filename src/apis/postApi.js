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
  const response = await axios.get(`${API_URL}/detail/${postId}`)
  return response.data
}
