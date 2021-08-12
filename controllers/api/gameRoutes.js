const router = require("express").Router();
const  { User, Game } = require("../../models/");
const withAuth = require('../../utils/auth');
const axios = require('axios')

// // find all games
router.get('/', async (req, res) => {
  try {
    const gameData = await Game.findAll(); 
    // res.status(200).json(gameData);

    const games = gameData.map((game) => game.get({ plain: true }));

    res.render("allgames", { games });
  } catch (err) {
    res.status(500).json(err);
    res.redirect('login');
  }
});

// Add a new Game
router.post('/', async, withAuth, (req, res) => {
    try {
      const url = `http://www.giantbomb.com/api/search?api_key=${process.env.API_KEY}&format=json&query=${encodeURIComponent(req.body.gameName)}&resources=game`
      const gameResponse = await axios.get(url)
      const boxArt = gameResponse.data.results[0].image.thumb_url
      
      const newGame = await Game.create({
        name: req.body.gameName,
        boxArt: boxArt,
      });
  
      res.status(201).json();
    } catch (err) {
      res.status(400).json(err);
    }
});



module.exports = router;
