import axios from 'axios'
axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_API_URL

// 사용자 정보 + 작성 글 + 댓글 + 좋아요 모두 한 번에 조회
export const getUserFullData = async nickname => {
  if (!nickname) {
    return
  }
  try {
    const response = await axios.get(`${API_URL}/user/${nickname}/full`)
    return response.data
  } catch (err) {
    console.error('사용자 전체 정보 조회 실패:', err)
    throw err
  }
}
