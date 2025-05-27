import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import css from './UserUpdate.module.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const UserUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const password = watch('password') //현재 비밀번호 필드 값
  useEffect(() => {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        nickname: user.nickname,
      })
    }
  }, [user, reset])
  const onSubmit = async data => {
    console.log(data)
  }
  return (
    <main>
      <h2>사용자 정보 변경</h2>
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
        {errors.email && <strong>{errors.email.message}</strong>}
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
        {errors.nickname && <strong>{errors.nickname.message}</strong>}
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
        {errors.password && <strong>{errors.password.message}</strong>}

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="패스워드 확인"
          {...register('passwordConfirm', {
            required: '비밀번호 확인을 입력해주세요',
            validate: value => value === password || '비밀번호가 일치하지 않습니다',
          })}
        />
        {errors.passwordConfirm && <strong>{errors.passwordConfirm.message}</strong>}

        <button type="submit" disabled={isSubmitting}>
          가입하기
        </button>
      </form>
    </main>
  )
}

export default UserUpdate
