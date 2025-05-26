import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleLike } from '../apis/postApi'
const LikeButton = ({ postId, likes }) => {
  const { _id } = useSelector(state => state.user)

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes ? likes.length : 0)

  // 컴포넌트 마운트 시 및 post나 userId가 변경될 때 좋아요 상태를 확인
  useEffect(() => {
    if (_id && likes) {
      // 사용자가 로그인 상태이고, 게시물에 좋아요 배열이 있을 경우
      const userLiked = likes.includes(_id)
      setIsLiked(userLiked)
    } else {
      setIsLiked(false)
    }
    // likes 배열이 변경될 때마다 카운트 업데이트
    setLikesCount(likes ? likes.length : 0)
  }, [likes, _id])
  const handleLikeToggle = async e => {
    e.stopPropagation()
    try {
      const likeUpdate = await toggleLike(postId)
      setIsLiked(likeUpdate.liked)
      setLikesCount(likeUpdate.likeCount)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <span onClick={handleLikeToggle} className="like">
      {isLiked ? '❤️' : '🤍'} {likesCount}
    </span>
  )
}

export default LikeButton
