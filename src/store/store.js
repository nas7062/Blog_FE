import { configureStore } from '@reduxjs/toolkit'
import { user } from './userslice'

export default configureStore({
  reducer: {
    user: user.reducer,
  },
})
