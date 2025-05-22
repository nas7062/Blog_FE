import { Link, NavLink } from 'react-router-dom'
import css from './header.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, logoutUser } from '../apis/userApi'
import { setNickName } from '../store/userslice'

export const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const user = useSelector(state => state.user)
  const nickname = user?.nickname
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
        console.log(userData.nickname)
        if (userData) dispatch(setNickName(userData.nickname))
      } catch (error) {
        console.log(error)
        dispatch(setNickName(null))
      }
    }
    getUser()
  }, [dispatch])
  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(setNickName(null))
      setIsMenuActive(false)
    } catch (error) {
      console.log(error)
      dispatch(setNickName(null))
    }
  }
  console.log(user, nickname)
  return (
    <header className={css.header}>
      <h1>
        <Link to={'/'}>TOKTOKLOG</Link>
      </h1>
      <Hamburger isMenuActive={isMenuActive} toggleMenu={toggleMenu} />
      <nav className={css.gnbCon}>
        <div className={css.gnb}>
          {!nickname ? (
            <>
              <MenuLike to="/register" label="회원가입" closeMenu={closeMenu} />
              <MenuLike to="/login" label="로그인" closeMenu={closeMenu} />
              {/* <MenuLike to="/createPost" label="글쓰기" /> */}
              {/* <MenuLike to="/mypage" label="마이페이지" /> */}
            </>
          ) : (
            <>
              <div>{nickname}님 환영합니다</div>
              <div onClick={handleLogout}>로그아웃</div>
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
