import { useForm } from 'react-hook-form'
import css from './registerpage.module.css'
import { registerUser } from '../apis/userApi'
import { useNavigate } from 'react-router-dom'
import KakaoLoginBtn from '../components/KakaoLoginBtn'

export const RegisterPage = () => {
  const {
    register,
    handleSubmit, //유효성 검사를 자동으로 실행하고 통과하면 첫 번째 함수를 실행
    watch,
    formState: { errors, isSubmitting }, //로그인 중에는 버튼을 비활성화해서 중복 요청을 막기
  } = useForm({ mode: 'onBlur' })
  /*useForm 안에 mode 를 onChange 로 설정하면 실시간으로 유효성 검사가 가능
  onBlur는 입력 후 빠져나가면 유효성 검사 */
  const navigate = useNavigate()
  const password = watch('password') //현재 비밀번호 필드 값

  const onSubmit = async data => {
    try {
      await registerUser(data)
      setTimeout(() => {
        navigate('/login')
      }, 300)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={css.registerpage}>
      <h2>회원가입 페이지</h2>
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
        {/* 닉네임 */}
        <input
          type="text"
          placeholder="닉네임"
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9가-힣]{2,10}$/,
              message: '2글자 이상 8글자 이하의 닉네임을 입력해주세요.',
            },
          })}
        />
        {errors.nickname && <strong className="error">{errors.nickname.message}</strong>}
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

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="패스워드 확인"
          {...register('passwordConfirm', {
            required: '비밀번호 확인을 입력해주세요',
            validate: value => value === password || '비밀번호가 일치하지 않습니다',
          })}
        />
        {errors.passwordConfirm && (
          <strong className="error">{errors.passwordConfirm.message}</strong>
        )}

        <button type="submit" disabled={isSubmitting} className={css.loginbtn}>
          가입하기
        </button>
      </form>
      <div className={css.kakao}>
        <KakaoLoginBtn />
      </div>
    </main>
  )
}
