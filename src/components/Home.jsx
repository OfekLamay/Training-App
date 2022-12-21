import React from 'react'
import SelectPattern from './SelectPattern';

export default function Home(props) {

    const genderOptions = [
      {value: "",
      text: "Choose gender"},
      {value: "Male",
      text: "Male"},
      {value: "Female",
      text: "Female"}
  ]
  const optionsData = {name: 'genders', id:'genderSelect', options: genderOptions};

  function doesHaveNumbers(string)
  {
    for (let i = 0; i< string.length; i++)
    {
      if (!isNaN(string[i]) && string[i] !== " ")
        return true;
    }
    return false;
  }

  const areDetailsValid = () => {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let gender = document.getElementById('genderSelect').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (isNaN(id))
    {
      window.alert("Id must be numbers");
      return;
    }

    let spacesInId = countLetterInString(" ", id);
      
    if (id.length - spacesInId < 9)
    {
      window.alert("Id length must be 9 \nKeep in mind that you can't put spaces!");
      return;
    }

    if (name.length < 4)
    {
      window.alert("Name is too short, must be at least 4 letters");
      return;
    }

    if (doesHaveNumbers(name))
    {
      window.alert("Your name can't be with numbers");
      return;
    }

    if (countLetterInString(" ", name) < 1)
    {
      window.alert("Name must have at least 1 space");
      return;
    }

    if (gender === "")
    {
      window.alert("Choose your gender");
      return;
    }

    if (password !== confirmPassword)
    {
      window.alert("You didn't type the same password");
      return;
    }

    if (password.length < 5 )
    {
      window.alert("Your password must be at least 5 letters long");
      return;
    }

    if (!doesConatainLettersAndNumbersOnly(password))
    {
      window.alert("Your password must contain only numbers and letters");
      return;
    }

    window.alert("All details are OK \nYou will be redirected to setup page");
    
    props.setUser({
      id: id,
      name: name,
      gender: gender,
      password: password,
    });

    props.changePage('setup')

  }

  const doesConatainLettersAndNumbersOnly = (password) => {

    for (let i = 0; i < password.toString().length; i++)
    {
      if (password.codePointAt(i) <= 47 ||
      (password.codePointAt(i) >= 58 && password.codePointAt(i) <= 64) ||
      (password.codePointAt(i) >= 91 && password.codePointAt(i) <= 96) || password.codePointAt(i) >= 123)
      return false;
    }

    return true
  }

  function countLetterInString(letter, str)
  {
    let counter = 0;
    for (let i = 0; i < str.length; i++)
    {
        if (letter === str[i])
        counter++;
    } 
    return counter;
  }

  return (
    <div>
      <div className='flexboxContainer'>
        <div className='nameLabel'>Enter your details or <div className='goToLogin' onClick={()=>{props.changePage('login')}}> go to log in screen</div></div>
        <br /><br />
        <input type="text" id='id' className='inputLabel' placeholder='Enter your id' />
        <br /><br />
        <input type="text" id="name" className='inputLabel' placeholder='Enter your name' />
        <br /><br />
        <input type="password" id="password" className='inputLabel' placeholder='Enter your password' />
        <br /><br />
        <input type="password" id="confirmPassword" className='inputLabel' placeholder='Confirm password' />
        <br /><br />
        <SelectPattern data={optionsData}/>
        <br /><br />
        <button onClick={areDetailsValid} className='clickbtn'>Sign up</button>
      </div>
    </div>
  )
}
