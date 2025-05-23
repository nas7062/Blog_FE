import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_API_URL

export const createPost = data => {
  const response = axios.post(`${API_URL}/createpost`, data)
  return response.data
}
