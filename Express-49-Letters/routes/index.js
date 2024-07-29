var express = require('express');
var router = express.Router();
const validator = require('validator');
// Shemes
const Game = require("../models/game")


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// GET ALL GAMES 
router.get('/getallgames', async function (req, res, next) {
  try {
    console.log("BE GETTING ALL GAMES");

    const allGamesOBJ = await Game.find();  // Retrieve all games
    return res.status(200).json({ allGamesOBJ });
  } catch (error) {
    next(error);
  }
});

// ADD TO LEADERBOARD 
router.put('/addtoleaderboard', async function (req, res, next) {
  try {
    const { gameBeingPlayed, completedWords, userRawString, playerName, playerPlug } = req.body;

    // Sanitize and validate playerName
    let sanitizedPlayerName = validator.trim(playerName);
    sanitizedPlayerName = validator.escape(sanitizedPlayerName);

    if (!validator.isLength(sanitizedPlayerName, { min: 1, max: 15 })) {
      return res.status(400).json({ error: 'playerName must be between 1 and 15 characters long' });
    }

    if (!/^[a-zA-Z0-9]+$/.test(sanitizedPlayerName)) {
      return res.status(400).json({ error: 'playerName can only contain alphanumeric characters' });
    }

    // Sanitize and validate playerPlug
    let sanitizedPlayerPlug = validator.trim(playerPlug);
    sanitizedPlayerPlug = validator.escape(sanitizedPlayerPlug);

    if (!validator.isLength(sanitizedPlayerPlug, { max: 40 })) {
      return res.status(400).json({ error: 'playerPlug can be a maximum of 40 characters long' });
    }

    if (/[\"\'\?\<\>\&\`\;\:]/.test(sanitizedPlayerPlug)) {
      return res.status(400).json({ error: 'playerPlug cannot contain quotation marks, question marks, or other syntax characters' });
    }

    // Get game object
    const originalGameOBJ = await Game.findOne({ _id: gameBeingPlayed._id });
    if (!originalGameOBJ) {
      return res.status(400).json({ error: "That game doesn't exist" });
    }

    // Validate game data
    for (let i = 0; i < originalGameOBJ.STRINGARRAY.length; i++) {
      if (originalGameOBJ.STRINGARRAY[i] === "_") continue;
      if (originalGameOBJ.STRINGARRAY[i] !== userRawString[i]) {
        return res.status(400).json({ msg: "String has been tampered with" });
      }
    }

    const allChars = completedWords.flat();
    for (let i = 0; i < originalGameOBJ.STRINGARRAY.length; i++) {
      if (originalGameOBJ.STRINGARRAY[i] === "_") continue;
      if (originalGameOBJ.STRINGARRAY[i] !== allChars[i]) {
        return res.status(400).json({ msg: "String has been tampered with" });
      }
    }

    // Calculate score
    let score = 0;
    for (let i = 0; i < completedWords.length; i++) {
      const wordLength = completedWords[i].length;
      if (wordLength < 7) {
        score += wordLength;
      } else if (wordLength >= 7 && wordLength <= 9) {
        score += wordLength * 3;
      } else if (wordLength > 9) {
        score += wordLength * 5;
      }
    }

    // Add a new score to the leaderboard
    const newScore = {
      NAME: sanitizedPlayerName,
      PLUG: sanitizedPlayerPlug,
      SCORE: score,
      COMPLETEDWORDS: completedWords
    };

    originalGameOBJ.SCORES.push(newScore);

    await originalGameOBJ.save();

    return res.status(200).json({ msg: "OK" });

  } catch (err) {
    next(err);
  }
});


// LEGACY DONT USE - Manually create new game
// router.post('/generatenewstring', async (req, res, next) => {
//   try {
//     // Get today's date
//     const today = new Date();
//     // const todayDate = today.toISOString().split('T')[0];
//     const todayDate = '2024-07-29'
//     console.log(todayDate);

//     const lastChar = todayDate.charAt(todayDate.length - 1);
//     console.log(lastChar);

//     const { generate } = await import('random-words');
//     const randomWordArray = generate({ exactly: 7, minLength: 7, maxLength: 7, seed: `${todayDate}` });
//     console.log(randomWordArray);

//     let letterArray = randomWordArray.join('').toUpperCase().split('');
//     console.log(letterArray);

//     const totalLetters = letterArray.length;
//     const totalReplacements = 34;
//     const minGroupSize = 7;

//     // Helper function to count consecutive underscores
//     const countConsecutiveUnderscores = (array) => {
//       let maxConsecutive = 0;
//       let currentCount = 0;
//       for (let char of array) {
//         if (char === '_') {
//           currentCount++;
//           if (currentCount > maxConsecutive) {
//             maxConsecutive = currentCount;
//           }
//         } else {
//           currentCount = 0;
//         }
//       }
//       return maxConsecutive;
//     };

//     // Generate 34 unique indexes ensuring at least two letters per 7 indexes and no more than 5 _ in a row
//     const indexesToReplace = new Set();
//     while (indexesToReplace.size < totalReplacements) {
//       const randomIndex = Math.floor(Math.random() * totalLetters);
//       // Check if adding this index violates the 2 letters per 7 indexes rule
//       const groupStart = Math.floor(randomIndex / minGroupSize) * minGroupSize;
//       const groupEnd = Math.min(groupStart + minGroupSize, totalLetters);
//       const groupIndexes = [...Array(totalLetters).keys()].slice(groupStart, groupEnd);
//       const remainingLetters = groupIndexes.filter(index => !indexesToReplace.has(index));
//       // Temporary array to test the replacement
//       const tempArray = [...letterArray];
//       tempArray[randomIndex] = '_';
//       if (remainingLetters.length > 2 && !indexesToReplace.has(randomIndex) && countConsecutiveUnderscores(tempArray) <= 5) {
//         indexesToReplace.add(randomIndex);
//         letterArray[randomIndex] = '_';
//       }
//     }
//     console.log(letterArray);
//     // END OF STRING GENERATION 

//     const existingGame = await Game.findOne({ DATE: todayDate });
//     if (existingGame) {
//       console.log("That game has already been created");
//       return res.status(403).json({ MSG: "This game already exists" });
//     }

//     const newGame = new Game({
//       DATE: todayDate,
//       STRINGARRAY: letterArray,
//       SCORES: []
//     });

//     await newGame.save();

//     return res.json({ String: letterArray });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ MSG: "An error occurred", error: error.message });
//   }
// });





module.exports = router;
