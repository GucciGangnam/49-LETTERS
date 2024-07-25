var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/gettodaydate', function (req, res, next) {
  // Get today's date
  const today = new Date();
  // Format the date as needed (e.g., YYYY-MM-DD)
  const formattedDate = today.toISOString().split('T')[0];
  return res.status(200).json({ Date: formattedDate });
});

router.post('/getStringByDate', async (req, res, next) => {
  const todayDate = req.body.date;
  const lastChar = todayDate.charAt(todayDate.length - 1);
  console.log(lastChar);
  const { generate } = await import('random-words');
  const randomWordArray = generate({ exactly: 7, minLength: 7, maxLength: 7, seed: `${todayDate}` })
  console.log(randomWordArray)
  const letterArray = randomWordArray.join('').toUpperCase().split('');
  console.log(letterArray);








  return res.status(200).json({ String: ['A', 'B', 'C'] });
});

// router.get('/getStringByDate', async (req, res) => {
//   try {
//     const { generate } = await import('random-words');
//     const randomWord = generate({ exactly: 7, minLength: 7, maxLength: 7, seed: "2024-07-07" })
//     console.log(randomWord)
//     res.send(`Random word: ${randomWord}`);
//   } catch (error) {
//     console.error('Error importing random-words:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });





module.exports = router;
