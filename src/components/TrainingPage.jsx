import React from 'react'
import {useState, useEffect} from 'react';
import Workout from './Workout';
import { useNavigate } from "react-router-dom";
import store from '../store/store';
import { generateWorkouts } from '../store/userSlices';
import { useSelector } from 'react-redux';

export default function TrainingPage(props) {

    const navigate = useNavigate()
    const userIndex = props.getUserIndex(props.user.id)
    const currentUser = useSelector(state => store.getState().users.users[userIndex])

    const [workouts, setWorkouts] = useState([])
    const [timesDone, setTimesDone] = useState(currentUser.weeksDone)

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

    const generateWorkoutsData = () => {
        let workoutsNumber = currentUser.weeklyWorkouts, yearsTraining = currentUser.yearsTraining;
        let trainingKM = (1 + (5 * yearsTraining)) / workoutsNumber;
        
        for (let i = 0; i < timesDone; i++)
            trainingKM *= 1.15;

        trainingKM = trainingKM.toFixed(2)
        let dataCreated = [{workout: 1, km: trainingKM, isDone : false}]

        for (let i = 2; i <= workoutsNumber; i++)
        {
            trainingKM *= 1.15;
            trainingKM = trainingKM.toFixed(2)
            dataCreated.push({workout: i, km: trainingKM, isDone : false})
        }

        setWorkouts(dataCreated);

    }

    const areWorkoutsDone = () =>
    {
        let counter = 0;
        for (let i = 0; i < currentUser.workouts.length; i++)
        {
            if (currentUser.workouts[i].isDone === true)
            counter++;
        }
        if (counter === currentUser.workouts.length)
        {
            setTimesDone(currentUser.weeksDone);
            return true;
        }
        return false;
    }

    useEffect(()=>{
        if (currentUser.workouts.length === 0)
        {
            generateWorkoutsData();
            store.dispatch(generateWorkouts({user: currentUser}));
            props.setUser({
                id: currentUser.id,
                name: currentUser.name,
                gender: currentUser.gender,
                password: currentUser.password, 
                weeklyWorkouts: currentUser.weeklyWorkouts,
                yearsTraining: currentUser.yearsTraining,
                pageUrl: currentUser.pageUrl,
                workouts: workouts,
                weeksDone: currentUser.weeksDone,
            })
        }
        else if (areWorkoutsDone())
        {
            generateWorkoutsData();
            store.dispatch(generateWorkouts({user: currentUser}));
            props.setUser({
                id: currentUser.id,
                name: currentUser.name,
                gender: currentUser.gender,
                password: currentUser.password, 
                weeklyWorkouts: currentUser.weeklyWorkouts,
                yearsTraining: currentUser.yearsTraining,
                pageUrl: currentUser.pageUrl,
                workouts: workouts,
                weeksDone: currentUser.weeksDone,
            })
        }
        else
        {
            if (workouts.length === 0)
                generateWorkoutsData();
        }
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
