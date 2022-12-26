import React from 'react'
import { useNavigate } from "react-router-dom";
import store from '../store/store';
import { addUser, generateWorkouts } from '../store/userSlices';


export default function Ready(props) {

    const navigate = useNavigate()

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
        

    </div>
  )
}
