import kakaoLoginImage from '../assets/kakao_login.png'
const API_URL = import.meta.env.VITE_API_URL

const KakaoLoginBtn = () => {
  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/auth/kakao/login`
  }

  return (
    <button
      onClick={handleKakaoLogin}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    >
      <img
        src={kakaoLoginImage}
        style={{
          width: '300px',
          height: '50px',
        }}
        alt="카카오 로그인"
      />
    </button>
  )
}

export default KakaoLoginBtn
