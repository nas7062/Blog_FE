import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    _id: '',
    nickname: '',
  },
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id
      state.nickname = action.payload.nickname
    },
    clearUser: state => {
      state._id = null
      state.nickname = null
    },
  },
})

export const { setUser, clearUser } = user.actions
