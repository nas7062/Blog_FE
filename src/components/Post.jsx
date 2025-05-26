import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/features'
import css from './Post.module.css'
import { toggleLike } from '../apis/postApi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
export const Post = ({ post }) => {
  const { title, summary, content, author, createdAt, cover } = post
  const { _id, nickname } = useSelector(state => state.user)

  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes ? post.likes.length : 0)

  // 컴포넌트 마운트 시 및 post나 userId가 변경될 때 좋아요 상태를 확인
  useEffect(() => {
    if (_id && post.likes) {
      // 사용자가 로그인 상태이고, 게시물에 좋아요 배열이 있을 경우
      const userLiked = post.likes.includes(_id)
      setIsLiked(userLiked)
    } else {
      setIsLiked(false)
    }
  }, [post, _id])

  const moveDetail = postId => {
    navigate(`/detail/${postId}`)
  }
  const handleLikeToggle = async e => {
    e.stopPropagation()
    try {
      const likeUpdate = await toggleLike(post._id)
      setIsLiked(likeUpdate.liked)
      setLikesCount(likeUpdate.likeCount)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div key={post._id} className={css.box} onClick={() => moveDetail(post._id)}>
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
        <span onClick={handleLikeToggle}>
          {isLiked ? '❤️' : '🤍'} {likesCount}
        </span>
        <p>댓글 : 0 </p>
      </div>
    </div>
  )
}
