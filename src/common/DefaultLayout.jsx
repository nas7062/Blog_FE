import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import './index.css'
import css from './defaultlayout.module.css'
import { useEffect, useState } from 'react'
import { debounce } from '../utils/features'
import { searchPost } from '../apis/postApi'

export const DefaultLayout = () => {
  const [search, setSearch] = useState('')
  const [searchposts, setSearchPosts] = useState([])

  const debouncedSearch = debounce(async search => {
    if (!search) return
    const result = await searchPost(search)
    setSearchPosts(result)
  }, 500)

  useEffect(() => {
    debouncedSearch(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  return (
    <div className={css.defaultlayout}>
      <Header setSearch={setSearch} />
      <Outlet searchposts={searchposts} />
    </div>
  )
}
