
// IMPORTS 
// React
import { useState, useEffect } from 'react'
// Styles
import './App.css'


// Compoennt 

// Pages
import { LandingPage } from './LandingPage'
import { GamePage } from './GamePage'
import { LoadingScreen } from './LoadingScreen'


// COMPONENT
function App() {
  // LOGIC
  const [gameState, setGameState] = useState('Landing')

  const [loading, setLoading] = useState(true);
  const [serverIssue, setServerIssue] = useState(false);

  const [todayDate, setTodayDate] = useState();
  // UE to fetch todays date on mount
  useEffect(() => {
    fetchTodaysDate();
  }, [])
  // Function to fetch todays date
  const fetchTodaysDate = async () => {
    setLoading(true)
    try {
      const backEndURL = import.meta.env.VITE_BACKEND_URL
      const response = await fetch(`${backEndURL}/gettodaydate`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        setLoading(false)
        setServerIssue(true);
        console.log("response not ok")
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setTimeout(() => {
        setLoading(false)
      }, 1500)

      console.log("response yes ok")
      console.log(result.Date)
      setTodayDate(result.Date)
    } catch (error) {
      setLoading(false)
      setServerIssue(true);
      console.error(error)
    }
  }






  // RETURN
  return (
    <div className='App'>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {gameState === 'Landing' && (
            <LandingPage todayDate={todayDate} setGameState={setGameState}/>
          )}
          {gameState === 'Play' && (
            <GamePage todayDate={todayDate} setGameState={setGameState} />
          )}
        </>
      )}





    </div>
  )
}

export default App
