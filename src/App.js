import './App.css';
import {useState} from 'react';
import {HashRouter as Router, Routes , Route} from 'react-router-dom';
import store from './store/store';
import { useSelector } from 'react-redux';


// components
import Header from './components/Header';
import Home from './components/Home';
import SetUp from './components/SetUp';
import Ready from './components/Ready';
import TrainingPage from './components/TrainingPage';
import WorkoutEdit from './components/WorkoutEdit';
import Login from './components/Login';


function App() {
  
  const allUsers = useSelector(state => store.getState().users.users)

  const [user, setUser] = useState({
    id: 0,
    name: "",
    gender: "",
    password: "",
    weeklyWorkouts: 0,
    yearsTraining: 0,
    pageUrl: "",
    workouts: [],
    weeksDone: 0,
  })

  const pages = {
    home: 'home',
    setup: 'setup',
    ready: 'ready',
    login: 'login',
    trainer: 'trainer',
    workoutEdit: 'workoutEdit'
  }

  const [workoutId, setWorkoutId] = useState(0);

  const [currentSetUpPage, setCurrentSetUpPage] = useState(pages.home);
  const [currentTrainigPage, setCurrentTrainigPage] = useState(pages.trainer);
  
  const logout = () => {
    setCurrentSetUpPage('home')
  }

  const checkLogIn = (id, password) => {
    
    for (let i = 0; i < allUsers.length; i++)
    {
      if (allUsers[i].id === id)
        if (allUsers[i].password === password)
          {
            setUser(allUsers[i]);
            setCurrentTrainigPage(pages.trainer);
            alert("Logged in!");
            return true;
          }
    }

    alert("Wrong details")
    return false;
  }

  const getUserIndex = (id) => {
    for (let i = 0; i < allUsers.length; i++)
    {
      if (allUsers[i].id === id)
      {
        return i;
      }
    }

    return -1;
  }

  const displaySetUpPage = () => { // Show what needed and hide everything else
    switch(currentSetUpPage) {
      case pages.home:
      {
        return <Home setUser={setUser} changePage={setCurrentSetUpPage}/>
      }
      case pages.setup:
      {
        return <SetUp user={user} setUser={setUser} changePage = {setCurrentSetUpPage}/>
      }
      case pages.ready:
      {
        return <Ready user={user} setUser={setUser} changePage = {setCurrentSetUpPage}/>
      }
      case pages.login:
      {
        return <Login changePage = {setCurrentSetUpPage} checkCredentials = {checkLogIn}/>
      }
      default: 
      {
        return null;
      }
    }
  }

  const displayTrainingPage = () => { // Show what needed and hide everything else
    switch(currentTrainigPage) {
      case pages.trainer:
      {
        return <TrainingPage logout={logout} getUserIndex={getUserIndex} setWorkoutId={setWorkoutId} user={user} changePage = {setCurrentTrainigPage}/>
      }
      case pages.workoutEdit:
      {
        return <WorkoutEdit user={user} workoutData={allUsers[(getUserIndex(user.id))].workouts[workoutId-1]} changePage = {setCurrentTrainigPage}/>
      }
      default: 
      {
        return null;
      }
    }
  }

  return (
    <div className="App">
  <Header title={"Training App"}/>
      <Router>
        <Routes>
          <Route path={'/'} element={displaySetUpPage()} />
          {allUsers.map((user, index) => {
            return <Route userIndex={index} key={user.id} path={`/training/${user.pageUrl}`} element={displayTrainingPage()} />
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
