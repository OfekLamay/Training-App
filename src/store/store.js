import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './userSlices'

const store = configureStore({
    reducer: {
      users: usersReducer,
    },
  })

export default store

