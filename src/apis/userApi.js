import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_API_URL

export const registerUser = async user => {
  const response = await axios.post(`${API_URL}/register`, user)
  return response.data
}

export const loginUser = async user => {
  const response = await axios.post(`${API_URL}/login`, user)
  return response.data
}

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`)
  return response.data
}

export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/logout`)
  return response.data
}
