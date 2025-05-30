import { useCallback, useEffect, useRef, useState } from 'react'
import { Post } from '../components/Post'
import { getAllPost } from '../apis/postApi'
import css from './PostList.module.css'
export const PostList = ({ searchposts }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const listRef = useRef(null)
  const observer = useRef()

  // node는 마지막 게시물 dom이 들어옴
  const lastPostElementRef = useCallback(
    node => {
      if (isLoading || !node) return

      // 이미 연결된 observer가 있다면 해제시킴 (이제 마지막이 아님)
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        //마지막 게시물이 화면에 들어오고 다음으로 넘어갈 개수가 되는지? 된다면 페이지수 증가
        if (entries[0].isIntersecting && hasNext) {
          setPage(prev => prev + 1)
        }
      })

      observer.current.observe(node) //새로 생긴 게시물의 마지목 요소를 감시 시작함
    },
    [isLoading, hasNext]
  )

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true)
        const { posts, hasNext } = await getAllPost(page)
        setPosts(prev => (page === 0 ? posts : [...prev, ...posts]))
        setHasNext(hasNext)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getPost()
  }, [page])
  console.log(searchposts)
  if (isLoading) return <div>loding...</div>
  return (
    <main>
      <ul className={css.postlist} ref={listRef}>
        {searchposts
          ? searchposts.map(post => (
              <li key={post._id}>
                <Post post={post} />
              </li>
            ))
          : posts.map((post, idx) => (
              <li key={post._id} ref={idx === posts.length - 1 ? lastPostElementRef : null}>
                <Post post={post} />
              </li>
            ))}
      </ul>
    </main>
  )
}
