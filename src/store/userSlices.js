import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
}

// user:
// id: 0,
// name: "",
// gender: "",
// password: "",
// weeklyWorkouts: 0,
// yearsTraining: 0,
// pageUrl: "",
// workouts: [],
// weeksDone: 0,
// isLoggedIn: false

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      addUser: (state, action) => {
        state.users = [...state.users, action.payload]
      },
      removeUser: (state, action) => {

        // payload: userIndex

        let usersAfterRemove = []
        
        for (let i = 0; i < state.users.length; i++)
        {
            if (action.payload.userIndex !== i)
            {
                usersAfterRemove = [...usersAfterRemove, state.users[i]]
            }
        }
        
        state.users = [usersAfterRemove]
      },
      generateWorkouts: (state, action) => {

        // payload: userIndex

        
      },
    }
})


export const { addUser } = usersSlice.actions

export const usersReducer = usersSlice.reducer