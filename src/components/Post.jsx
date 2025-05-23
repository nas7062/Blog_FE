import { formatDate } from '../utils/features'
import css from './Post.module.css'
export const Post = ({ post }) => {
  const { title, summary, content, author, createdAt, cover } = post

  return (
    <div key={post._id} className={css.box}>
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
        <p>찜 : 0 </p>
        <p>댓글 : 0 </p>
      </div>
    </div>
  )
}
