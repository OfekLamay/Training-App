import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';

// components
import Header from './components/Header';
import Home from './components/Home';
import SetUp from './components/SetUp';
import Ready from './components/Ready';
import TrainingPage from './components/TrainingPage';
import WorkoutEdit from './components/WorkoutEdit';

function App() {

  const [user, setUser] = useState({
    id: 0,
    name: "",
    gender: "",
    weeklyWorkouts: 0,
    yearsTraining: 0,
    pageUrl: "",
    workouts: []
  })

  const pages = {
    home: 'home',
    setup: 'setup',
    ready: 'ready',
    trainer: 'trainer',
    workoutEdit: 'workoutEdit'
  }

  const finishWorkout = (workoutId) => {
    let userWorkouts = user.workouts;
    for (let i = 0; i < userWorkouts.length; i++)
    {
      if (userWorkouts[i].workout === workoutId)
      {
        userWorkouts[i] = {workout: workoutId, km: userWorkouts[i].km, isDone : true}
        i = userWorkouts.length;
      }
    }

    let counter = 0;
    for (let i = 0; i < userWorkouts.length; i++)
      if (userWorkouts[i].isDone === true)
        counter++;

    if (counter === userWorkouts.length)
      setFinishedWeeks(finishedWeeks + 1);

    setUser({
      id: user.id,
      name: user.name,
      gender: user.gender,
      weeklyWorkouts: user.weeklyWorkouts,
      yearsTraining: user.yearsTraining,
      pageUrl: user.pageUrl,
      workouts: userWorkouts
    })
  }

  const [workoutId, setWorkoutId] = useState(0);
  const [finishedWeeks, setFinishedWeeks] = useState(0);

  const [currentSetUpPage, setCurrentSetUpPage] = useState(pages.home);
  const [currentTrainigPage, setCurrentTrainigPage] = useState(pages.trainer);

  const displaySetUpPage = () => { // Show what needed and hide everything else
    switch(currentSetUpPage) {
      case pages.home:
        {
          return <Home setUser={setUser} changePage = {setCurrentSetUpPage}/>
        }
      case pages.setup:
        {
          return <SetUp user={user} setUser={setUser} changePage = {setCurrentSetUpPage}/>
        }
      case pages.ready:
        {
          return <Ready user={user} setUser={setUser} changePage = {setCurrentSetUpPage}/>
        }
    }
  }

  const logout = () => {
    setCurrentSetUpPage('home')
  }

  const displayTrainingPage = () => { // Show what needed and hide everything else
    switch(currentTrainigPage) {
      case pages.trainer:
        {
          return <TrainingPage logout={logout} timesDone={finishedWeeks} setUser={setUser} setWorkoutId={setWorkoutId} user={user} changePage = {setCurrentTrainigPage}/>
        }
      case pages.workoutEdit:
        {
          return <WorkoutEdit user={user} setWorkoutId={setWorkoutId} workoutData={user.workouts[workoutId-1]} finishWorkout={finishWorkout} changePage = {setCurrentTrainigPage}/>
        }
    }
  }

  return (
    <div className="App">
  <Header title={"Training App"}/>
      <Router>
        <Routes>
          <Route path={'/'} element={displaySetUpPage()} />
          <Route path={`/training/${user.pageUrl}`} element={displayTrainingPage()}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
