import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import store from '../store/store';

export default function Login(props) {

    const navigate = useNavigate();

    const allUsers = useSelector(state => store.getState().users.users);
  
    const getPageUrlById = (id) => {
      for (let i = 0; i < allUsers.length; i++)
      {
        if (allUsers[i].id === id)
        {
          return `/training/${allUsers[i].pageUrl}`;
        }
      }
  
      return "/"
    }

    const areDetailsValid = () => {
        let id = document.getElementById('id').value;
        let password = document.getElementById('password').value;
    
        if (props.checkCredentials(id, password))
          navigate(getPageUrlById(id));
    
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
