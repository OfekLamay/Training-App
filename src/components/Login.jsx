import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {

    const navigate = useNavigate()

    const areDetailsValid = () => {
        let id = document.getElementById('id').value;
        let password = document.getElementById('password').value;
    
        if (props.checkCredentials(id, password))
            navigate(props.getUrl(id));
    
      }

  return (
    <div>
      <div className='flexboxContainer'>
        <div className='nameLabel'>Enter your details</div>
        <br /><br />
        <input type="text" id='id' className='inputLabel' placeholder='Enter your id' />
        <br /><br />
        <input type="password" id="password" className='inputLabel' placeholder='Enter your password' />
        <br /><br />
        <button onClick={areDetailsValid} className='clickbtn'>Log in</button>
        <br /><br />
        <button onClick={()=>{props.changePage('home')}} className='clickbtn'>Go back</button>
      </div>
    </div>
  )
}
