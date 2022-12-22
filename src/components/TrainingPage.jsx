import React from 'react'
import {useState, useEffect} from 'react';
import Workout from './Workout';
import { useNavigate } from "react-router-dom";

export default function TrainingPage(props) {

    const navigate = useNavigate()

    const [workouts, setWorkouts] = useState([])
    const [timesDone, setTimesDone] = useState(props.user.weeksDone)

    function logout()
    {
        props.logout();
        navigate('/')
    }

    function nextWorkoutNumber()
    {
      for (let i = 0; i < props.user.workouts.length; i++)
      {
        if (props.user.workouts[i].isDone === false)
          return i + 1;
      }
    }

    const generateWorkoutsData = () => {
        let workoutsNumber = props.user.weeklyWorkouts, yearsTraining = props.user.yearsTraining;
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
        for (let i = 0; i < props.user.workouts.length; i++)
        {
            if (props.user.workouts[i].isDone === true)
            counter++;
        }
        if (counter === props.user.workouts.length)
        {
            setTimesDone(timesDone + 1);
            return true;
        }
        return false;
    }

    useEffect(()=>{
        if (props.user.workouts.length === 0)
        {
            generateWorkoutsData();
            props.setUser({
                id: props.user.id,
                name: props.user.name,
                gender: props.user.gender,
                password: props.user.password, 
                weeklyWorkouts: props.user.weeklyWorkouts,
                yearsTraining: props.user.yearsTraining,
                pageUrl: props.user.pageUrl,
                workouts: workouts,
                weeksDone: props.user.weeksDone,
            })
        }
        else if (areWorkoutsDone())
        {
            generateWorkoutsData();
                props.setUser({
                    id: props.user.id,
                    name: props.user.name,
                    gender: props.user.gender,
                    password: props.user.password, 
                    weeklyWorkouts: props.user.weeklyWorkouts,
                    yearsTraining: props.user.yearsTraining,
                    pageUrl: props.user.pageUrl,
                    workouts: workouts,
                    weeksDone: props.user.weeksDone,
                })
        }
      })

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
            {props.user.workouts.map((workout) => {
                return <Workout key={`workout${workout.workout}`} workoutData={workout} changePage = {props.changePage} setWorkoutId={props.setWorkoutId}/>
            })}
        </div>
        <br /><br /><br />
        <button onClick={logout} className='clickbtn'>Log Out</button>
    </div>
  )
}
