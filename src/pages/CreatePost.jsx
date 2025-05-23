import { Controller, useForm } from 'react-hook-form'
import css from './CreatePost.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import QuillEditor from '../components/ReactQuill'
import { createPost } from '../apis/postApi'

export const CreatePost = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user.nickname) {
        navigate('/login')
      }
    }, 100) // 살짝만 기다림 => user 불러올 때 초기화 되서 자꾸 로그인 페이지로 가서
    return () => clearTimeout(timer)
  }, [user, navigate])

  const onSubmit = async data => {
    const { title, summary, files, content } = data

    // FormData 객체 생성 (파일 포함 폼 데이터를 위해 사용)
    const formData = new FormData()
    formData.set('title', title)
    formData.set('summary', summary)
    formData.set('content', content)

    // 파일이 존재하면 추가
    if (files && files.length > 0) {
      formData.set('files', files[0])
    }
    console.log(formData)
    try {
      await createPost(formData)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <main>
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.createpost}>
        <label htmlFor="">제목</label>
        <input
          type="text"
          {...register('title', {
            required: '제목을 입력해주세요',
          })}
        />
        {errors.title && <strong>{errors.title.message}</strong>}
        <label htmlFor="">요약내용</label>
        <input
          type="text"
          {...register('summary', {
            required: '요약내용을 입력해주세요',
          })}
        />
        {errors.summary && <strong>{errors.summary.message}</strong>}
        <label htmlFor="files">파일</label>
        <input id="files" type="file" accept="image/*" {...register('files')} />
        <label htmlFor="content">내용</label>
        <div className={css.editorWrapper}>
          {/* QuillEditor는 일반 input이 아니기 때문에 Controller로 감싼다 */}
          <Controller
            control={control} // useForm에서 받은 control 객체
            name="content"
            rules={{ required: '내용을 입력해주세요' }}
            render={({ field }) => (
              <QuillEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder="내용을 입력해주세요"
              />
            )}
          />
        </div>
        {errors.content && <div className={css.error}>{errors.content.message}</div>}
        <button disabled={isSubmitting} type="submit">
          작성하기
        </button>
      </form>
    </main>
  )
}
