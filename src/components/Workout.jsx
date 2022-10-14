import React from 'react'

export default function Workout(props) {

    const setBGColor = () => {
        if (props.workoutData.isDone === true)
            return "chartreuse";
        return "rgb(112, 173, 211)";
    }

    const setCursor = () => {
        if (props.workoutData.isDone === false)
            return "pointer";
        return "auto";
    }

    let workoutStyle = {
        cursor: setCursor(),
        backgroundColor: setBGColor(),
    };

    const changeToWorkoutEditPage = () => {
        if (props.workoutData.isDone === false)
        {
            props.setWorkoutId(props.workoutData.workout)
            props.changePage('workoutEdit')
            return;
        }
        
        window.alert("Can't edit successfull workout!")
    }

  return (
    <div className='workout' onClick={changeToWorkoutEditPage} style={workoutStyle}>
        <div>
            workout number {props.workoutData.workout}
            <br/>
            {props.workoutData.km} KM
        </div>
    </div>
  )
}
