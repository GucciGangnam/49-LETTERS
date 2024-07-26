var express = require('express');
var router = express.Router();
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


// LEGACY DONT USE 
// router.post('/generatenewstring', async (req, res, next) => {
//   try {
//     // Get today's date
//     const today = new Date();
//     // const todayDate = today.toISOString().split('T')[0];
//     const todayDate = '2024-07-07'
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
