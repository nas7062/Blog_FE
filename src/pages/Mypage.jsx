import { useSelector } from 'react-redux'
import css from './Mypage.module.css'
import { useEffect, useState } from 'react'
import { getUserFullData } from '../apis/mypageApi'
import { Post } from '../components/Post'
import { Comments } from '../components/Comments'
import { formatDate } from '../utils/features'
import { Link, useNavigate } from 'react-router-dom'

export const Mypage = () => {
  const { nickname } = useSelector(state => state.user)
  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [userComments, setUserComments] = useState([])
  const [userLikes, setUserLikes] = useState([])
  const [loading, setLoading] = useState(false)
  // 현재 로그인한 사용자 정보
  const currentUser = useSelector(state => state.user)
  const isCurrentUser = currentUser && currentUser.nickname === nickname
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAllUserData = async () => {
      if (!nickname) return
      try {
        setLoading(true)
        const { user, posts, comments, likes } = await getUserFullData(nickname)
        setUserData(user)
        setUserPosts(posts)
        setUserComments(comments)
        setUserLikes(likes)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllUserData()
  }, [nickname])

  const moveUserUpdate = () => {
    navigate('/userUpdate')
  }
  console.log(userLikes)
  if (loading) return <div>로딩 중...</div>
  if (!userData) return <div>사용자를 찾을 수 없습니다.</div>

  return (
    <main className={css.container}>
      <h2>사용자페이지</h2>
      <section>
        <h3>사용자정보</h3>
        <div className={css.userInfo}>
          <img src={userData.profileImage || 'https://picsum.photos/200/300'} alt="" />
          <p>{nickname}</p>
          <div>
            <button disabled={!isCurrentUser} onClick={moveUserUpdate}>
              내 정보 수정
            </button>
          </div>
        </div>
      </section>
      <section>
        <h3>사용자가 작성한 글 </h3>
        <ul className={css.postList}>
          {userPosts.map(post => (
            <li className={css.postCard} key={post._id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>사용자가 작성한 댓글 </h3>
        {userComments.length > 0 ? (
          <ul className={css.commentList}>
            {userComments.map(comment => (
              <Link to={`/detail/${comment.postId}`}>
                <li key={comment._id} className={css.commentCard}>
                  <p className={css.commentContent}>{comment.content}</p>
                  <div className={css.commentMeta}>
                    <p>작성일:{formatDate(comment.createdAt)}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>작성한 댓글이 없습니다.</p>
        )}
      </section>
      <section>
        <h3>사용자가 좋아요 클릭한 글</h3>
        {userLikes.length > 0 ? (
          <ul className={css.postList}>
            {userLikes.map(post => (
              <li className={css.postCard} key={post._id}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p>좋아요 클릭한 글이 없습니다.</p>
        )}
      </section>
    </main>
  )
}

export default Mypage
