// IMPORTS 
// Styles 
import "./LandingPage.css"
// REact 
import { useState } from "react"




// COMPONENT 
export const LandingPage = ({ setGameState, allGames, setGameBeingPlayed }) => {
    // LOGIC
    // ANIMATIONS 
    const [animateLeft, setAnimateLeft] = useState(false)
    const [animateRight, setAnimateRight] = useState(true)

    const [gameIndex, setGameIndex] = useState(0)


    const handleGoBackOneDay = () => {
        if (gameIndex >= allGames.length - 1) {
            return;
        } else {
            setAnimateRight(false)
            setTimeout(() => {
                setAnimateLeft(false)
            }, 100)
            setAnimateRight(false)
            setTimeout(() => {
                setAnimateLeft(true)
            }, 150)

            setGameIndex(prev => prev + 1)
        }

    }

    const handleGoForwardOneDay = () => {
        if (gameIndex <= 0) {
            return;
        } else {
            setAnimateLeft(false)
            setTimeout(() => {
                setAnimateRight(false)
            }, 100)

            setTimeout(() => {
                setAnimateRight(true)
            }, 150)
            setGameIndex(prev => prev - 1)
        }
    }

    // Handle Start game 
    const handleStartGame = () => {
        setGameBeingPlayed(allGames[gameIndex])
        setGameState('Play')
    }



    // RETURN
    return (
        <div className="LandingPage">
            <div className="Title">
                <div className="Title-Box-Black">
                    4
                </div>
                <div className="Title-Box-Black">
                    9
                </div>
                <div className="Title-Box-White">
                    L
                </div>
                <div className="Title-Box-White">
                    E
                </div>
                <div className="Title-Box-White">
                    T
                </div>
                <div className="Title-Box-White">
                    T
                </div>
                <div className="Title-Box-White">
                    E
                </div>
                <div className="Title-Box-White">
                    R
                </div>
                <div className="Title-Box-White">
                    S
                </div>
            </div>

            <div className="Date-Selector">
                <div
                    onClick={handleGoBackOneDay}
                    className="Back-One-Day-Button">
                    {'<'}
                </div>

                <div className="Date-Selector-Date-Container">
                    {animateLeft && (
                        <div className="Date-Selector-Date-Animate-Left">
                            {allGames[gameIndex].DATE}
                        </div>
                    )}
                    {animateRight && (
                        <div className="Date-Selector-Date-Animate-Right">
                            {allGames[gameIndex].DATE}
                        </div>
                    )}



                </div>


                <div
                    onClick={handleGoForwardOneDay}
                    className="Forward-One-Day-Button">
                    {'>'}
                </div>

            </div>



            <div className="Play-Container"
                onClick={handleStartGame}>
                <div className="Play-Container-Box">
                    P
                </div>
                <div className="Play-Container-Box">
                    L
                </div>
                <div className="Play-Container-Box">
                    A
                </div>
                <div className="Play-Container-Box">
                    Y
                </div>
            </div>

            <div className="How-To-Play-Container">
                <div className="How-To-Play-Container-Box">
                    H
                </div>
                <div className="How-To-Play-Container-Box">
                    O
                </div>
                <div className="How-To-Play-Container-Box">
                    W
                </div>
                <div className="How-To-Play-Container-Box">
                    T
                </div>
                <div className="How-To-Play-Container-Box">
                    O
                </div>
                <div className="How-To-Play-Container-Box">
                    P
                </div>
                <div className="How-To-Play-Container-Box">
                    L
                </div>
                <div className="How-To-Play-Container-Box">
                    A
                </div>
                <div className="How-To-Play-Container-Box">
                    Y
                </div>
            </div>

            <div className="Leaderboard-Container">
                <div className="Leaderboard-Title-Container">
                    <div className="leaderboard-Title-Box">
                        L
                    </div>
                    <div className="leaderboard-Title-Box">
                        E
                    </div>
                    <div className="leaderboard-Title-Box">
                        A
                    </div>
                    <div className="leaderboard-Title-Box">
                        D
                    </div>
                    <div className="leaderboard-Title-Box">
                        E
                    </div>
                    <div className="leaderboard-Title-Box">
                        R
                    </div>
                    <div className="leaderboard-Title-Box">
                        B
                    </div>
                    <div className="leaderboard-Title-Box">
                        O
                    </div>
                    <div className="leaderboard-Title-Box">
                        A
                    </div>
                    <div className="leaderboard-Title-Box">
                        R
                    </div>
                    <div className="leaderboard-Title-Box">
                        D
                    </div>
                </div>



                {allGames[gameIndex].SCORES[0] ? (
                    <>
                        {allGames[gameIndex].SCORES.map((score, index) => (
                            <div
                                key={index}
                                className="Highscore-Card">
                                <div className="Highscore-Index">
                                    {index + 1}
                                </div>
                                <div className="Highscore-Name">
                                    {score.NAME}
                                </div>
                                <div className="Highscore-Plug">
                                    "{score.PLUG}"
                                </div>
                                <div className="Highscore-Score">
                                    Score:{score.SCORE}
                                </div>
                                <div className="Highscore-Longest-Word">
                                    Longest Word: {
                                        score.COMPLETEDWORDS.reduce((longest, word) => {
                                            return word.length > longest ? word.length : longest;
                                        }, 0)
                                    }
                                </div>
                                <div className="Highscore-Points-Indicator">
                                    <div className="White">
                                        {
                                            score.COMPLETEDWORDS.reduce((total, word) => {
                                                return word.length < 7 ? total + word.length : total;
                                            }, 0)
                                        }
                                    </div>
                                    <div className="Green">
                                        {
                                            score.COMPLETEDWORDS.reduce((total, word) => {
                                                return word.length >= 7 && word.length <= 9
                                                    ? total + (word.length * 3)
                                                    : total;
                                            }, 0)
                                        }
                                    </div>
                                    <div className="Black">
                                        {
                                            score.COMPLETEDWORDS.reduce((total, word) => {
                                                return word.length > 9 ? total + (word.length * 5) : total;
                                            }, 0)
                                        }
                                    </div>

                                </div>
                            </div>
                        ))}
                    </>

                ) : (
                    <>NO scores set for this date yet.</>
                )}


            </div>

        </div>
    )
}