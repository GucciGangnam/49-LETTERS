
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
import { HowtoplayPage } from './HowtoplayPage'


// COMPONENT
function App() {
  // LOGIC
  const [gameState, setGameState] = useState('Landing')
  const [gameBeingPlayed, setGameBeingPlayed] = useState(null)


  const [loading, setLoading] = useState(true);
  const [serverIssue, setServerIssue] = useState(false);

  const [allGames, setAllGames] = useState();
  // UE to fetch todays date on mount
  useEffect(() => {
    fetchAllGames();
  }, [])
// Function to fetch all games
const fetchAllGames = async () => {
  setLoading(true);
  try {
    const backEndURL = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backEndURL}/getallgames`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setServerIssue(true);
      console.log("response not ok");
      throw new Error('Network response was not ok');
    }
    const result = await response.json();

    // Sort the games by date in descending order
    const sortedGames = result.allGamesOBJ.sort((a, b) => {
      return new Date(b.DATE) - new Date(a.DATE);
    });

    setAllGames(sortedGames);
    console.log(sortedGames);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
    console.log("response yes ok");

  } catch (error) {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setServerIssue(true);
    console.error(error);
  }
};






  // RETURN
  return (
    <div className='App'>

      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {gameState === 'Landing' && (
            <LandingPage setGameState={setGameState} allGames={allGames} setGameBeingPlayed={setGameBeingPlayed}/>
          )}
          {gameState === 'Play' && (
            <GamePage setGameState={setGameState} allGames={allGames} gameBeingPlayed={gameBeingPlayed} fetchAllGames={fetchAllGames} />
          )}
          {gameState === 'Howtoplay' && (
            <HowtoplayPage setGameState={setGameState}/>
          )}
        </>
      )}





    </div>
  )
}

export default App
