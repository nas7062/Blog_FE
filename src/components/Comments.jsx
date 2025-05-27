import { useSelector } from 'react-redux'
import css from './comments.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createComment, deleteComment, getComment, updateComment } from '../apis/commentApi'
import { formatDate } from '../utils/features'

export const Comments = ({ postId }) => {
  const { nickname } = useSelector(state => state.user)
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  // 수정모드
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComment(postId)
        setComments(response)
      } catch (error) {
        console.error('댓글 목록 조회 실패:', error)
      }
    }
    fetchComments()
  }, [postId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!newComment) {
      alert('댓글을 입력하세요')
      return
    }
    try {
      setIsLoading(true)
      //새로운 댓글 객체 생성
      const commentData = {
        content: newComment,
        author: nickname,
        postId: postId,
      }
      await createComment(commentData)
      const updatedComments = await getComment(postId)
      setComments(updatedComments)
      setNewComment('')
      setIsLoading(false)
    } catch (error) {
      console.error('댓글 등록 실패:', error)
      setIsLoading(false)
    }
  }

  const handleDelete = async commentId => {
    try {
      console.log(commentId)
      await deleteComment(commentId)
      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditMode = comment => {
    setEditingCommentId(comment._id)
    setEditContent(comment.content)
  }
  const handleNomalMode = () => {
    setEditingCommentId(null)
    setEditContent('')
  }
  // 댓글 수정 완료
  const handleUpdateComment = async commentId => {
    if (!editContent.content.trim()) {
      alert('댓글 내용을 입력하세요')
      return
    }

    try {
      setIsLoading(true)
      // 댓글 수정 API 호출
      await updateComment(commentId, editContent)
      // 댓글 목록 업데이트
      setComments(prevComments =>
        prevComments.map(comment =>
          comment._id === commentId ? { ...comment, content: editContent } : comment
        )
      )
      handleNomalMode()
      setIsLoading(false)
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      setIsLoading(false)
    }
  }
  return (
    <section className={css.comments}>
      {nickname ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            disabled={isLoading}
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? '등록 중...' : '댓글 등록'}
          </button>
        </form>
      ) : (
        <p className={css.logMessage}>
          댓글을 작성하려면 <Link to="/login">로그인이 필요합니다.</Link>
        </p>
      )}

      <ul>
        {comments.length !== 0 ? (
          comments.map(comment => (
            <li key={comment._id} className={css.list}>
              {editingCommentId === comment._id ? (
                <>
                  <div className={css.commnet}>
                    <p className={css.author}>{comment.author}</p>
                    <p className={css.date}>{formatDate(comment.createdAt)}</p>
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className={css.text}
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  <div className={css.btns}>
                    <button disabled={isLoading} onClick={() => handleUpdateComment(comment._id)}>
                      수정완료
                    </button>
                    <button onClick={handleNomalMode} disabled={isLoading}>
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={css.commnet}>
                    <p className={css.author}>{comment.author}</p>
                    <p className={css.date}>{formatDate(comment.createdAt)}</p>
                    <p className={css.text}>{comment.content}</p>
                  </div>
                  {nickname === comment.author && (
                    <div className={css.btns}>
                      <button onClick={() => handleEditMode(comment)}>수정</button>
                      <button onClick={() => handleDelete(comment._id)}>삭제</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))
        ) : (
          <div>댓글이 없습니다...</div>
        )}
      </ul>
    </section>
  )
}
