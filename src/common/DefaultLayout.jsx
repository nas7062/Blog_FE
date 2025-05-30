import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import './index.css'
import css from './defaultlayout.module.css'
import { useEffect, useState } from 'react'
import { debounce } from '../utils/features'
import { getAllPost, searchPost } from '../apis/postApi'
import { createContext } from 'react'

export const SearchContext = createContext()

export const DefaultLayout = () => {
  const [search, setSearch] = useState('')
  const [searchposts, setSearchPosts] = useState([])
  const location = useLocation()
  let result = ''
  const debouncedSearch = debounce(async search => {
    if (search.length === 0) result = await getAllPost()
    else result = await searchPost(search)
    setSearchPosts(result)
  }, 500)

  useEffect(() => {
    setSearch('') // 검색어 초기화
  }, [location.pathname])

  useEffect(() => {
    debouncedSearch(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <SearchContext.Provider value={searchposts}>
      <div className={css.defaultlayout}>
        <Header setSearch={setSearch} search={search} />
        <Outlet />
      </div>
    </SearchContext.Provider>
  )
}
