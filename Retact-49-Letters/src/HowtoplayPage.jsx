// IMPORTS 
// Styles 
import "./HowtoplayPage.css"
// React 
import { useState, useEffect } from "react";

// COMPONENT 
export const HowtoplayPage = ({ setGameState }) => {

    // How to play stages 
    const [stage, setStage] = useState(0);



    // Handle go home
    const handleGoHome = () => {
        setGameState("Landing")
    }


    return (
        <div className="HowtoplayPage">

            <div
                onClick={handleGoHome}
                className="Title">
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


            <div className="HTP-Section">
                <div className="HTP-Text">
                The aim of the game is to type a total of 49 letters comprised of words.
                </div>
                <div className="HTP-IMG">
                    <img src="/49.png"/>
                </div>
            </div>

            <div className="HTP-Section">
                <div className="HTP-Text">
                Some of the 49 letters are already pre-filled so youll have to think hard about what letters you can fill around them.
                </div>
                <div className="HTP-IMG">
                    <img src="/EmptyString.png"/>
                </div>
            </div>

            <div className="HTP-Section">
                <div className="HTP-Text">
                As you type your letters, the rest of the spaces will appear and your word will appear below.
                </div>
                <div className="HTP-IMG">
                    <img src="/2letterString.png"/>
                </div>
            </div>

            <div className="HTP-Section">
                <div className="HTP-Text">
                Once you have made a word and you're happy with it, click ENTER to submit it.
                </div>
                <div className="HTP-IMG">
                    <img src="fullWord.png"/>
                </div>
            </div>

            <div className="HTP-Section">
                <div className="HTP-Text">
                The words you submit will appear at the top of the page and count towards to 49 letters.
                </div>
                <div className="HTP-IMG">
                    <img src="/HTPScore.png"/>
                </div>
            </div>

            <div className="HTP-Section">
                <div className="HTP-Text">
                The game will end once you submit the last of the 49 letters.
                <ul>
                    <li>1 point for each letter in a word under 7 letters long</li>
                    <li>2 points for each letter in a word between 7 and 9 letters long</li>
                    <li>3 points for each letter in a word over 9 letters long</li>
                </ul>
                </div>
                <div className="HTP-IMG">
                    <img src="/49.png"/>
                </div>
            </div>

            <button
            onClick={handleGoHome}
            >Done</button>



        </div>
    )
}