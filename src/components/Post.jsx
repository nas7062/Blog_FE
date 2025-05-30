import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/features'
import css from './Post.module.css'
import LikeButton from './LikeButton'
export const Post = ({ post }) => {
  const { title, summary, content, author, createdAt, cover } = post

  const navigate = useNavigate()

  const moveDetail = postId => {
    navigate(`/detail/${postId}`)
  }
  return (
    <div className={css.box} onClick={() => moveDetail(post._id)}>
      <div className={css.imgwrap}>
        <img src={`${import.meta.env.VITE_API_URL}/${cover}`} alt={title} />
      </div>
      <div className={css.titlewrap}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.summary}>{summary}</p>
      </div>
      <div className={css.content} dangerouslySetInnerHTML={{ __html: content }} />
      <div className={css.infowarp}>
        <span className={css.author}>{author}</span>
        <span className={css.date}>{formatDate(createdAt)}</span>
      </div>
      <div className={css.plus}>
        <LikeButton postId={post._id} likes={post.likes} />
        <p>댓글 : {post.commentCount ? post.commentCount : '없음'} </p>
      </div>
    </div>
  )
}
