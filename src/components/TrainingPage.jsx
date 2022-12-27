import React from 'react'
import { useEffect } from 'react';
import Workout from './Workout';
import { useNavigate } from "react-router-dom";
import store from '../store/store';
import { generateWorkouts } from '../store/userSlices';
import { useSelector } from 'react-redux';

export default function TrainingPage(props) {

    const navigate = useNavigate()
    const userIndex = props.getUserIndex(props.user.id)
    const currentUser = useSelector(state => store.getState().users.users[userIndex])

    function logout()
    {
        props.logout();
        navigate('/')
    }

    function nextWorkoutNumber()
    {
      for (let i = 0; i < currentUser.workouts.length; i++)
      {
        if (currentUser.workouts[i].isDone === false)
          return i + 1;
      }
    }

    const areWorkoutsDone = () =>
    {
        for (let i = 0; i < currentUser.workouts.length; i++)
        {
            if (currentUser.workouts[i].isDone === false)
                return false
        }

        return true;
    }

    useEffect(()=>{
        if (currentUser.workouts.length === 0)
            store.dispatch(generateWorkouts({user: currentUser}));
        else if (areWorkoutsDone())
            store.dispatch(generateWorkouts({user: currentUser}));
      }, [currentUser.workouts])

    const changeToWorkoutEditPage = () => {
        props.setWorkoutId(nextWorkoutNumber())
        props.changePage('workoutEdit')
        return;
    }

  return (
    <div>
        <div className='nameLabel'>Welcome Trainer</div>
        <br /><br />
        <button onClick={changeToWorkoutEditPage} className='clickbtn'>Start</button>
        <br /><br />
        <div className='flexboxContainer'>
            {currentUser.workouts.map((workout) => {
                return <Workout key={`workout${workout.workout}`} workoutData={workout} changePage = {props.changePage} setWorkoutId={props.setWorkoutId}/>
            })}
        </div>
        <br /><br /><br />
        <button onClick={logout} className='clickbtn'>Log Out</button>
    </div>
  )
}
