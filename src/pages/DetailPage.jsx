import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, getByIdPost } from '../apis/postApi'
import css from './DetailPage.module.css'
import { formatDate } from '../utils/features'
import { useSelector } from 'react-redux'
import LikeButton from '../components/LikeButton'
import { Comments } from '../components/Comments'
import CircularText from '../components/CircularText'
const DetailPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState('')
  const { nickname } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { title, cover, content, summary, createdAt, author } = post
  const [commentCount, setCommentCount] = useState(0)
  useEffect(() => {
    const getPost = async () => {
      const data = await getByIdPost(postId)
      setPost(data)
      setCommentCount(data.commentCount)
    }
    getPost()
  }, [postId])

  const handleDeletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost(postId)
        alert('삭제되었습니다.')
        navigate('/')
      } catch (error) {
        console.log('글 삭제 실패:', error)
      }
    }
  }
  const updateCommentCount = count => {
    setCommentCount(count)
  }
  if (!post)
    return (
      <CircularText
        text="10012BLOG10012BLOG"
        onHover="speedUp"
        spinDuration={5}
        className="custom-class"
      />
    )
  return (
    <main className={css.container}>
      <div className={css.imgwrap}>
        <img src={`${import.meta.env.VITE_API_URL}/${cover}`} alt={title} />
      </div>
      {nickname && <LikeButton postId={postId} likes={post.likes} />}
      <div className={css.titlewrap}>
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
      <div className={css.sumwrap}>
        <h4 className={css.summary}>{summary}</h4>
        <p>{formatDate(createdAt)}</p>
      </div>
      <div className={css.content} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={css.btnarea}>
        {nickname === post.author && (
          <>
            <Link to={`/edit/${postId}`}>수정</Link>
            <span onClick={handleDeletePost}>삭제</span>
          </>
        )}
        <Link to={'/'}>목록으로</Link>
      </div>
      <span className={css.comment}>댓글수 : {commentCount}</span>
      <Comments postId={postId} updateCommentCount={updateCommentCount} />
    </main>
  )
}

export default DetailPage
