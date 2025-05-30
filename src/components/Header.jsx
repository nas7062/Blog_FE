import { Link, NavLink } from 'react-router-dom'
import css from './header.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, logoutUser } from '../apis/userApi'
import { clearUser, setUser } from '../store/userslice'
import { throttle } from '../utils/features'
import React from 'react'

export const Header = ({ setSearch, search }) => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const { _id, nickname } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const toggleMenu = () => {
    setIsMenuActive(prev => !prev)
  }
  const closeMenu = () => {
    setIsMenuActive(false)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserProfile()
        if (userData) {
          // 이제 setUser 액션으로 id, nickname 둘 다 저장
          dispatch(
            setUser({ _id: userData._id, nickname: userData.nickname, email: userData.email })
          )
        } else {
          dispatch(clearUser())
        }
      } catch (error) {
        console.log(error)
        dispatch(clearUser())
      }
    }
    getUser()
  }, [dispatch])
  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(clearUser())
      setIsMenuActive(false)
    } catch (error) {
      console.log(error)
      dispatch(clearUser())
    }
  }

  const handleResize = throttle(() => {
    // 800이상이면 저절로 닫혀지게
    if (window.innerWidth > 800) {
      setIsMenuActive(false)
    }
  }, 1000)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'} className={css.logo}>
          10012
        </Link>
      </h1>
      <Hamburger isMenuActive={isMenuActive} toggleMenu={toggleMenu} />
      <nav
        className={`${css.gnbCon}  ${isMenuActive ? css.active : ''} ${!nickname ? css.noLogin : ''}`}
      >
        <div className={css.gnb}>
          <div className={css.inputwrap}>
            <input
              className={css.searchinput}
              type="text"
              value={search}
              placeholder="게시물을 검색해주세요"
              onChange={e => setSearch(e.target.value)}
            />
            <i className={`fa-solid fa-magnifying-glass  ${css.search}`}></i>
          </div>

          {!nickname ? (
            <>
              <MenuLike to="/register" label="회원가입" closeMenu={closeMenu} />
              <MenuLike to="/login" label="로그인" closeMenu={closeMenu} />
            </>
          ) : (
            <>
              <span>{nickname}님 환영합니다!</span>
              <span onClick={handleLogout}>로그아웃</span>
              <MenuLike to="/createPost" label="글쓰기" closeMenu={closeMenu} />
              <MenuLike to="/mypage" label="마이페이지" closeMenu={closeMenu} />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

const MenuLike = ({ to, label, closeMenu }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? css.active : '')} onClick={closeMenu}>
    {label}
  </NavLink>
)

const Hamburger = ({ isMenuActive, toggleMenu }) => (
  <button className={`${css.hamburger} ${isMenuActive ? css.active : ''}`} onClick={toggleMenu}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  </button>
)
