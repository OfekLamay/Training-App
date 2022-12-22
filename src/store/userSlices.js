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

        // payload: {user: user}

        let userIndex;

        for (let i = 0; i < state.users.length; i++)
        {
            if (state.users[i].id === action.payload.user.id)
            {
                userIndex = i
                i = state.users.length
            }
        }

        let workoutsNumber = state.users[userIndex].weeklyWorkouts, yearsTraining = state.users[userIndex].yearsTraining;
        let trainingKM = (1 + (5 * yearsTraining)) / workoutsNumber;
        
        for (let i = 0; i < state.users[userIndex].weeksDone; i++)
            trainingKM *= 1.15;

        trainingKM = trainingKM.toFixed(2)
        let dataCreated = [{workout: 1, km: trainingKM, isDone : false}]

        for (let i = 2; i <= workoutsNumber; i++)
        {
            trainingKM *= 1.15;
            trainingKM = trainingKM.toFixed(2)
            dataCreated.push({workout: i, km: trainingKM, isDone : false})
        }

        state.users[userIndex].workouts = [...dataCreated]

        
      },
      finishWorkout: (state, action) => {

        // payload: {workoutId: workoutData.workout, user: user}
        console.log(action.payload)

        let userIndex, counter = 0;

        for (let i = 0; i < state.users.length; i++)
        {
            if (state.users[i].id === action.payload.user.id)
            {
                userIndex = i
                i = state.users.length
            }
        }

        state.users[userIndex].workouts[action.payload.workoutId - 1] = {
            workout: action.payload.workoutId, 
            km: state.users[userIndex].workouts[action.payload.workoutId - 1].km, 
            isDone : true
        }

        for (let i = 0; i < state.users[userIndex].workouts.length; i++)
        {
            if (state.users[userIndex].workouts[i].isDone === true)
                counter++;
        }

        if (counter === state.users[userIndex].workouts.length)
            state.users[userIndex].weeksDone = state.users[userIndex].weeksDone + 1

      },
    }
})


export const { addUser, finishWorkout, generateWorkouts } = usersSlice.actions

export const usersReducer = usersSlice.reducer