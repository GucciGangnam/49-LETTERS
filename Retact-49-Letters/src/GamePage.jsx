// IMPORTS 
// React 
import { useState, useEffect } from "react"
// Styles 
import "./GamePage.css"
// Word exists
import wordExists from 'word-exists';
// Pages 
import { LoadingScreen } from "./LoadingScreen";



// COMPONENTS 
export const GamePage = ({ todayDate, setGameState }) => {

    // LOGIC 

    // FETCH GENERATED STRING BY DATA
    const [loading, setLoading] = useState(true);
    const [generatedString, setGeneratedString] = useState([]);

    console.log('genned string is' + generatedString)
    // Function to fetch todays game by date
    const fetchStringByDate = async () => {
        console.log(todayDate)
        setLoading(true);
        try {
            const backEndURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backEndURL}/getStringByDate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: todayDate
                }),
            });

            if (!response.ok) {
                setLoading(false);
                console.log("response not ok");
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setTimeout(() => {
                setLoading(false);
            }, 1500);

            console.log("response yes ok");
            console.log(result.Date);
            setGeneratedString(result.String);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStringByDate();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    // GENERATED BY BACK END
    // const [generatedString, setGeneratedString] = useState(
    //     ['_', '_', '_', '_', '_', '_', '_',
    //         '_', '_', '_', '_', '_', '_', '_',
    //         '_', '_', '_', '_', '_', '_', '_',
    //         '_', '_', '_', '_', '_', '_', '_',
    //         'P', '_', '_', 'S', '_', '_', 'N',
    //         'R', '_', '_', 'I', '_', 'E', '_',
    //         '_', 'O', '_', '_', 'E', '_', 'Y'])

    const [userRawString, setUserRawString] = useState([]);
    useEffect(() => {
        console.log(userRawString);
    }, [userRawString])

    // COMPLETED WORDS ARRAY 
    const [userStringArray, setUserStringArray] = useState([])
    const [completedWords, setCompletedWords] = useState([]);

    // STRING CHAR COUNT (Start at 0 finish at 48)
    const [stringCharCount, setStringCharCount] = useState(0)

    //USER INPUT
    const [userInput, setUserInput] = useState([])
    const [invalidWord, setInvalidWord] = useState(false);


    // DESKTOP KEY PRESS LISTENERS
    useEffect(() => {
        // Function must be inside UE?
        const handleKeyDown = (e) => {
            const key = e.key.toUpperCase();
            // Check if key is a single uppercase letter
            if (key.length === 1 && key >= 'A' && key <= 'Z') {
                KeyboardletterPressFunction(key);
            }
            if (key === "ENTER") {
                KeyboardEnterKeyPress();
            }
            if (key === "BACKSPACE") {
                KeyboardDeletePressFunction();
            }
        }
        // KEYBOARD LETTER PRESS FUNCTION
        const KeyboardletterPressFunction = (key) => {
            if (stringCharCount >= 49) {
                return;
            }
            if (generatedString[stringCharCount] === "_") {
                setStringCharCount(prevCount => prevCount + 1);
                setUserInput(prevArr => [...prevArr, key]);
                setUserRawString(prevArr => [...prevArr, key]);
            } else {
                const exclusiveLetter = generatedString[stringCharCount];
                if (exclusiveLetter === key) {
                    setStringCharCount(prevCount => prevCount + 1);
                    setUserInput(prevArr => [...prevArr, key]);
                    setUserRawString(prevArr => [...prevArr, key]);
                } else {
                    return;
                }
            }
        }
        // KEYBOARD DELETE PRESS FUNCTION
        const KeyboardDeletePressFunction = () => {
            if (stringCharCount <= 0) {
                return;
            }
            if (userInput.length === 0) {
                console.log('ntg to dlt');
                setCompletedWords((prevState) => {
                    // Capture the last array before removing it
                    const arrayToRemove = prevState[prevState.length - 1];
                    setUserInput(arrayToRemove);
                    const arrayLength = arrayToRemove.length;
                    setUserStringArray(prevArr => prevArr.slice(0, -arrayLength));
                    // Remove the last array from the previous state
                    return prevState.slice(0, -1);
                });
                return;
            }
            else {
                setStringCharCount(prevCount => prevCount - 1);
                setUserInput(prevArr => prevArr.slice(0, -1));
                setUserRawString(prevArr => prevArr.slice(0, -1));
            }
        }
        // KEYBOARD ENTER PRESS FUNCTION
        const KeyboardEnterKeyPress = () => {
            // Deconstruct userInput into a string
            const wordToCheck = userInput.join('');
            if (wordExists(wordToCheck)) {
                setUserStringArray(prevArr => [...prevArr, ...userInput]);
                console.log(userStringArray);
                setCompletedWords(prevArr => [...prevArr, userInput]);
                setUserInput([])
            } else {
                setInvalidWord(true);
                setTimeout(() => {
                    setInvalidWord(false);
                }, 300)
            }
        };

        // Set up 
        window.addEventListener('keydown', handleKeyDown);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [generatedString, stringCharCount, userInput, userStringArray]);


    // ON SCREEN LETTER PRESS FUNCTION
    const letterPressFunction = (e) => {
        if (stringCharCount >= 49) {
            return;
        }
        const inputtedLetter = e.target.innerHTML
        console.log(inputtedLetter)
        console.log("OS INPUT LETTER " + inputtedLetter)
        // If generatedString[stringCharCount] is " " then add that letter to current word array
        if (generatedString[stringCharCount] === "_") {
            setStringCharCount(prevCount => prevCount + 1);
            setUserInput(prevArr => [...prevArr, inputtedLetter]);
            setUserRawString(prevArr => [...prevArr, inputtedLetter])
        } else {
            const exclusiveLetter = generatedString[stringCharCount];
            if (exclusiveLetter === inputtedLetter) {
                setStringCharCount(prevCount => prevCount + 1);
                setUserInput(prevArr => [...prevArr, inputtedLetter]);
                setUserRawString(prevArr => [...prevArr, inputtedLetter])
            } else {
                return;
            }
        }
    };

    // DELETE PRESS FUNCTION 
    const deletePressFunction = () => {
        if (stringCharCount <= 0) {
            return;
        }
        if (userInput.length === 0) {
            console.log('ntg to dlt');
            setCompletedWords((prevState) => {
                // Capture the last array before removing it
                const arrayToRemove = prevState[prevState.length - 1];
                setUserInput(arrayToRemove);
                const arrayLength = arrayToRemove.length;
                setUserStringArray(prevArr => prevArr.slice(0, -arrayLength));
                // Remove the last array from the previous state
                return prevState.slice(0, -1);
            });
            return;
        }
        else {
            setStringCharCount(prevCount => prevCount - 1);
            setUserInput(prevArr => prevArr.slice(0, -1));
            setUserRawString(prevArr => prevArr.slice(0, -1));
        }
    }

    const enterKeyPress = () => {
        // Deconstruct userInput into a string
        const wordToCheck = userInput.join('');
        if (wordExists(wordToCheck)) {
            console.log('YES A WORD');
            setUserStringArray(prevArr => [...prevArr, ...userInput]);
            console.log(userStringArray);
            setCompletedWords(prevArr => [...prevArr, userInput]);
            setUserInput([])
        } else {
            console.log('NOT A WORD')
            setInvalidWord(true);
            setTimeout(() => {
                setInvalidWord(false);
            }, 300)
        }
    };










    // RETURN

    return (
        <div>
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div className="GamePage">
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

                    <div className="Top-Section">
                        <div className="Top-Section-Left">
                            {completedWords.map((wordArray, index) => (
                                <div
                                    key={index}
                                    className="Top-Section-Left-Word-Container">
                                    {/* if word array is under 7 length */}
                                    {(wordArray.length < 7) &&
                                        wordArray.map((letter, letterIndex) => (
                                            <div
                                                key={letterIndex}  // Use letterIndex here too
                                                className="Top-Section-Left-Word-Box-Green">
                                                {letter}
                                            </div>
                                        ))}
                                    {/* if word array is over between 7 and 9 */}
                                    {(wordArray.length == 7) &&
                                        wordArray.map((letter, letterIndex) => (
                                            <div
                                                key={letterIndex}  // Use letterIndex here too
                                                className="Top-Section-Left-Word-Box-Gold">
                                                {letter}
                                            </div>
                                        ))}
                                    {/* if word array is 10 or more */}
                                    {(wordArray.length > 7) &&
                                        wordArray.map((letter, letterIndex) => (
                                            <div
                                                key={letterIndex}  // Use letterIndex here too
                                                className="Top-Section-Left-Word-Box-Black">
                                                {letter}
                                            </div>
                                        ))}

                                </div>
                            ))}
                        </div>

                        <div className="Top-Section-Right">
                            <div className="Letter-Count">
                                {userStringArray.length}
                            </div>
                        </div>
                    </div>

                    <div className="String-Section-Container">
                        <div className="String-Section">
                            {stringCharCount > 0 ?
                                <div className="Half-Square-Visible">
                                    {userRawString[(stringCharCount - 1)]}
                                </div>
                                :
                                <div className="Half-Square-Invisible">
                                </div>
                            }

                            <div className="String-Section-Current-Letter-Box-Border">
                                <div className="String-Section-Current-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 1}</div>
                                    {generatedString[stringCharCount]}
                                </div>
                            </div>

                            {generatedString[(stringCharCount + 1)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 2}</div>
                                    {generatedString[(stringCharCount + 1)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 2)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 3}</div>
                                    {generatedString[(stringCharCount + 2)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 3)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 4}</div>
                                    {generatedString[(stringCharCount + 3)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 4)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 5}</div>
                                    {generatedString[(stringCharCount + 4)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 5)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 6}</div>
                                    {generatedString[(stringCharCount + 5)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 6)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 7}</div>
                                    {generatedString[(stringCharCount + 6)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 7)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 8}</div>
                                    {generatedString[(stringCharCount + 7)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 8)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 9}</div>
                                    {generatedString[(stringCharCount + 8)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 9)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 10}</div>
                                    {generatedString[(stringCharCount + 9)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 11)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 11}</div>
                                    {generatedString[(stringCharCount + 11)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 12)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 12}</div>
                                    {generatedString[(stringCharCount + 12)]}
                                </div>
                                :
                                <></>
                            }
                            {generatedString[(stringCharCount + 13)] ?
                                <div className="String-Section-Letter-Box">
                                    <div className="Index-Indicator">{stringCharCount + 13}</div>
                                    {generatedString[(stringCharCount + 13)]}
                                </div>
                                :
                                <></>
                            }



                        </div>
                    </div>





                    <div className={invalidWord ? "Current-Word-Section-Invalid" : "Current-Word-Section"}>

                        {userInput.map((letter, index) => (
                            <div
                                key={index}
                                className={invalidWord ? "Current-Word-Section-Box-Invalid" : "Current-Word-Section-Box"}>
                                {letter}
                            </div>
                        ))}


                    </div>

                    {/* <button className="Add-Word-Button">
                Add Word
            </button> */}

                    <div className="Keyboard">

                        <div className="Keyboard-Row">
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">Q</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">W</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">E</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">R</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">T</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">Y</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">U</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">I</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">O</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">P</button>
                        </div>

                        <div className="Keyboard-Row">
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">A</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">S</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">D</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">F</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">G</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">H</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">J</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">K</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">L</button>
                        </div>

                        <div className="Keyboard-Row">
                            <button
                                onClick={deletePressFunction}
                                className="Special-Button"
                                style={{
                                    backgroundColor: 'var(--Orange)'
                                }}
                            >Del</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">Z</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">X</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">C</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">V</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">B</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">N</button>
                            <button
                                onClick={letterPressFunction}
                                className="Keyboard-Button">M</button>
                            <button
                                onClick={enterKeyPress}
                                className="Special-Button"
                                style={{
                                    backgroundColor: 'var(--Green)'
                                }}
                            >ENTR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}