import React from 'react'
import { useNavigate } from "react-router-dom";

export default function WorkoutEdit(props) {

    const navigate = useNavigate()

    const clickSuccess = () => {
        window.alert("Workout done!")
        props.finishWorkout(props.workoutData.workout)
        props.changePage('trainer');
        navigate(`/training/${props.user.pageUrl}`);
    }

    const clickFailure = () => {
        props.changePage('trainer');
        navigate(`/training/${props.user.pageUrl}`);
    }

  return (
    <div>
        <div className='workoutData'>
            <div className='workoutHeader'>Workout {props.workoutData.workout}</div>
            <br/>
            {props.workoutData.km} KM
            <br/><br/>
            Change status?
        </div>
        <br/>
        <button onClick={clickSuccess} className='clickbtn'>Success</button>
        <br/> <br/>
        <button onClick={clickFailure} className='clickbtn'>Failure</button>
    </div>
  )
}
