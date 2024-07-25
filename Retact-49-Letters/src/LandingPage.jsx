// IMPORTS 
// Styles 
import "./LandingPage.css"




// COMPONENT 
export const LandingPage = ({todayDate, setGameState}) => {
    // LOGIC

    // Handle Start game 
    const handleStartGame = () => { 
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
            <div className="Today-Date">
            Today {todayDate}
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

            {/* <div className="Practice-Container"
            onClick={handleStartGame}>
                <div className="Practice-Container-Box">
                    P
                </div>
                <div className="Practice-Container-Box">
                    R
                </div>
                <div className="Practice-Container-Box">
                    A
                </div>
                <div className="Practice-Container-Box">
                    C
                </div>
                <div className="Practice-Container-Box">
                    T
                </div>
                <div className="Practice-Container-Box">
                    I
                </div>
                <div className="Practice-Container-Box">
                    C
                </div>
                <div className="Practice-Container-Box">
                    E
                </div>
            </div> */}

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



        </div>
    )
}