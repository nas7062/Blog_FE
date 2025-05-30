import { Controller, useForm } from 'react-hook-form'
import css from './EditPost.module.css'
import QuillEditor from '../components/ReactQuill'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getByIdPost, updatePost } from '../apis/postApi'

const EditPost = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })
  const { postId } = useParams()
  const navigate = useNavigate()
  const { nickname } = useSelector(state => state.user)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!nickname) {
        navigate('/login')
      }
    }, 100) // 살짝만 기다림 => user 불러올 때 초기화 되서 자꾸 로그인 페이지로 가서
    return () => clearTimeout(timer)
  }, [nickname, navigate])

  // 글 정보 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getByIdPost(postId)

        // 현재 사용자와 글 작성자가 다르면 접근 제한
        if (postData.author !== nickname) {
          navigate('/')
          return
        }

        // useForm의 reset()으로 폼 값 설정
        reset({
          title: postData.title,
          summary: postData.summary,
          content: postData.content,
          cover: postData.cover,
        })
      } catch (err) {
        console.log('글 정보 불러오기 실패:', err)
      }
    }

    if (nickname) {
      fetchPost()
    }
  }, [postId, nickname, navigate, reset])

  const onSubmit = async data => {
    const { title, summary, file, content } = data

    // FormData 객체 생성 (파일 포함 폼 데이터를 위해 사용)
    const formData = new FormData()
    formData.set('title', title)
    formData.set('summary', summary)
    formData.set('content', content)

    // 파일이 존재하면 추가
    if (file && file.length > 0) {
      formData.set('files', file[0])
    }
    try {
      await updatePost(postId, formData)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <main className={css.container}>
      <h2>수정하기</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.Editpost}>
        <label htmlFor="">제목</label>
        <input
          type="text"
          {...register('title', {
            required: '제목을 입력해주세요',
          })}
        />
        {errors.title && <strong className="error">{errors.title.message}</strong>}
        <label htmlFor="">요약내용</label>
        <input
          type="text"
          {...register('summary', {
            required: '요약내용을 입력해주세요',
          })}
        />
        {errors.summary && <strong className="error">{errors.summary.message}</strong>}
        <label htmlFor="file">파일</label>
        <input id="file" type="file" accept="image/*" {...register('file')} />
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
        {errors.content && <div className="error">{errors.content.message}</div>}
        <button disabled={isSubmitting} type="submit">
          수정하기
        </button>
      </form>
    </main>
  )
}

export default EditPost
