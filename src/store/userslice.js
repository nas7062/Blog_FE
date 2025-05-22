import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    nickname: '',
  },
  reducers: {
    setNickName: (state, action) => {
      state.nickname = action.payload
    },
  },
})

export const { setNickName } = user.actions
