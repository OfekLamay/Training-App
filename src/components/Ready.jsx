import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import store from '../store/store';
import { addUser, generateWorkouts } from '../store/userSlices';
import WorkoutPreview from './WorkoutPreview';

export default function Ready(props) {

    const navigate = useNavigate();
    const [workoutsPreview, setWorkoutsPreview] = useState([])

    const generateWorkoutsData = () => {
        let workoutsNumber = props.user.weeklyWorkouts, yearsTraining = props.user.yearsTraining;
        let trainingKM = (1 + (5 * yearsTraining)) / workoutsNumber;

        trainingKM = trainingKM.toFixed(2)
        let dataCreated = [{workout: 1, km: trainingKM, isDone : false}]

        for (let i = 2; i <= workoutsNumber; i++)
        {
            trainingKM *= 1.15;
            trainingKM = trainingKM.toFixed(2)
            dataCreated.push({workout: i, km: trainingKM, isDone : false})
        }

        setWorkoutsPreview(dataCreated);

    }

    useEffect(() => {
        generateWorkoutsData();
      }, []);

    const clickYes = () => {
        window.alert("You will be redirected to your page")
        store.dispatch(addUser(props.user))
        store.dispatch(generateWorkouts({user: props.user}))
        props.changePage('home')
        navigate(`/training/${props.user.pageUrl}`);
    }

    const clickNo = () => {
        window.alert("You will be redirected to home page \nYour signing in details were not saved")
        props.setUser({});
        props.changePage('home')
    }

  return (
    <div>
        <div className='nameLabel'>Ready?</div>
        <br /><br />
        <div className='flexboxContainerLine'>
            <button onClick={clickYes} className='clickbtn'>Yes</button>
            <button onClick={clickNo} className='clickbtn'>No</button>
        </div>

        <p className='workoutsPreviewText'>
            Take a look at your initial workouts!
        </p>

        <div className='flexboxContainer'>
            {workoutsPreview.map((workout) => {
                return <WorkoutPreview key={`workoutPreview-${workout.workout}`} workoutData={workout} />
            })}
        </div>
        
    </div>
  )
}
