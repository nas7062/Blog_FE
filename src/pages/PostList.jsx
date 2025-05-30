import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Post } from '../components/Post'
import { getAllPost } from '../apis/postApi'
import css from './PostList.module.css'
import { SearchContext } from '../common/DefaultLayout'
export const PostList = () => {
  const searchPosts = useContext(SearchContext)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const observer = useRef()
  const scrollPosition = useRef(0)
  // node는 마지막 게시물 dom이 들어옴
  const lastPostElementRef = useCallback(
    node => {
      if (isLoading || !node || (searchPosts && searchPosts.length > 0)) return // 검색 하면 관찰 중지

      // 이미 연결된 observer가 있다면 해제시킴 (이제 마지막이 아님)
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          //마지막 게시물이 화면에 들어오고 다음으로 넘어갈 개수가 되는지? 된다면 페이지수 증가
          if (entries[0].isIntersecting && hasNext && !isLoading) {
            setPage(prev => prev + 1)
          }
        },
        { threshold: 1.0 } // threshold를 1.0으로 설정해 완전히 화면에 들어왔을 때만 감지
      )

      observer.current.observe(node) //새로 생긴 게시물의 마지목 요소를 감시 시작함
    },
    [isLoading, hasNext, searchPosts]
  )

  useEffect(() => {
    if (searchPosts && searchPosts.length > 0) {
      // 검색 모드일 때 기존 posts 초기화
      setPosts([])
      setPage(0)
      setHasNext(false)
      return
    }

    const getPost = async () => {
      try {
        setIsLoading(true)
        scrollPosition.current = window.scrollY // 🔥 스크롤 위치 저장
        const { posts: newPosts, hasNext: more } = await getAllPost(page)
        setPosts(prev => (page === 0 ? newPosts : [...prev, ...newPosts]))
        setHasNext(more)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        setTimeout(() => {
          window.scrollTo(0, scrollPosition.current) // 🔥 위치 복원
        }, 0)
      }
    }

    getPost()
  }, [page, searchPosts])

  return (
    <main>
      <ul className={css.postlist}>
        {searchPosts && searchPosts.length > 0
          ? searchPosts.map(post => (
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
      {isLoading && <div>loading...</div>}
    </main>
  )
}
