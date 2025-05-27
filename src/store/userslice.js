import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    nickname: '',
    email: '',
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id
      state.nickname = action.payload.nickname
      state.email = action.payload.email
    },
    clearUser: state => {
      state._id = null
      state.nickname = null
      state.email = null
    },
    setNickname: (state, action) => {
      state.nickname = action.payload
    },
  },
})

export const { setUser, clearUser, setNickname } = user.actions
