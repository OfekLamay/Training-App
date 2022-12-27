import React from "react";

export default function WorkoutPreview(props) {

  return (
    <div className="workout">
        <div>
            workout number {props.workoutData.workout}
            <br/>
            {props.workoutData.km} KM
        </div>
    </div>
  );
}
