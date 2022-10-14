import React from 'react'
import SelectPattern from './SelectPattern';

export default function SetUp(props) {

    const workoutsOptions = [
        {value: "",
        text: "Choose times"}
    ]

    const yearsOptions = [
        {value: "",
        text: "Choose years"}
    ]

    for (let i = 1; i < 8; i++)
    {
        let option = {value: i,
        text: i}
        workoutsOptions.push(option)
    }

    for (let i = 1; i < 31; i++)
    {
        let option = {value: i,
        text: i}
        yearsOptions.push(option)
    }

    const workoutsOptionsData = {name: 'workouts', id:'workoutsSelect', options: workoutsOptions};
    const yearsOptionsData = {name: 'years', id:'yearsSelect', options: yearsOptions};

    const areDetailsValid = () => {
        let timesAweek = document.getElementById('workoutsSelect').value;
        let years = document.getElementById('yearsSelect').value;

        if (timesAweek === "")
        {
            window.alert("Please select how many times you'd like to in a week");
            return;
        }

        if (years === "")
        {
            window.alert("Please select how many years you have been training");
            return;
        }
    
        window.alert("All details are OK :D \nYou will be redirected to final setup page");
        props.setUser({
            id: props.user.id,
            name: props.user.name,
            gender: props.user.gender,
            weeklyWorkouts: timesAweek,
            yearsTraining: years,
            pageUrl: props.user.name.replace(" ", "-"),
            workouts: []
        })
        props.changePage('ready')   
      }

  return (
    <div>
        <div className='nameLabel'>Hello {props.user.name}!</div>
        <br/> <br/>
        <div className='questionLabel'>How many workouts a week?</div>
        <br/> <br/>
        <SelectPattern data={workoutsOptionsData}/>
        <br/> <br/>
        <div className='questionLabel'>How many years have you been training?</div>
        <br/> <br/>
        <SelectPattern data={yearsOptionsData}/>
        <br /><br />
        <button onClick={areDetailsValid} className='clickbtn'>Next</button>
    </div>
  )
}
