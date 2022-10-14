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

  function doesHaveUppercaseLetters(string)
  {
    for (let i = 0; i< string.length; i++)
    {
      if (string[i] === string[i].toUpperCase() && string[i] !== " ")
        return true;
    }
    return false;
  }

  const areDetailsValid = () => {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let gender = document.getElementById('genderSelect').value;

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

    if (doesHaveUppercaseLetters(name))
    {
      window.alert("Please insert your name with under cases only");
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

    window.alert("All details are OK :D \nYou will be redirected to setup page");
    
    props.setUser({
      id: id,
      name: name,
      gender: gender
    });

    props.changePage('setup')

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
          <div className='nameLabel'>Enter your details</div>
          <br /><br />
          <input type="text" id='id' className='inputLabel' placeholder='Enter your id' />
          <br /><br />
          <input type="text" id="name" className='inputLabel' placeholder='Enter your name' />
          <br /><br />
          <SelectPattern data={optionsData}/>
          <br /><br />
          <button onClick={areDetailsValid} className='clickbtn'>Next</button>
        </div>
    </div>
  )
}
