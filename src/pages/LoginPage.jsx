import { useForm } from 'react-hook-form'
import css from './loginPage.module.css'
import { loginUser } from '../apis/userApi'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userslice'
import { useNavigate } from 'react-router-dom'
import KakaoLoginBtn from '../components/KakaoLoginBtn'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async data => {
    try {
      const { email, _id, nickname } = await loginUser(data)
      console.log(_id, nickname)
      dispatch(setUser({ email, _id, nickname }))
      setTimeout(() => {
        navigate('/')
      }, 300)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className={css.loginpage}>
      <h2>로그인 페이지</h2>
      <form className={css.container} onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <input
          type="email"
          placeholder="이메일"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '이메일 양식에 맞게 입력해주세요',
            },
          })}
        />
        {errors.email && <strong className="error">{errors.email.message}</strong>}
        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
              message: '영문 숫자 조합 8자리 이상을 입력해야 합니다',
            },
          })}
        />
        {errors.password && <strong className="error">{errors.password.message}</strong>}
        <button type="submit" disabled={isSubmitting} className={css.loginbtn}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div className={css.kakao}>
        <KakaoLoginBtn />
      </div>
    </main>
  )
}
