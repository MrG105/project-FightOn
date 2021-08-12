const router = require("express").Router();
const  { User, Game, UserGames } = require("../../models/");
const withAuth = require('../../utils/auth');
const axios = require('axios')
// const sequelize = require('sequelize')
const sequelize = require('../../config/connection');

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
router.post('/', withAuth, async (req, res) => {
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


// top 3 games

router.get('/top', async (req, res) => {
  try {
    const query = await sequelize.query(`
      SELECT COUNT(user_id) as users, game_id, g.name, g.box_art
      FROM user_games ug
      JOIN game g ON ug.game_id = g.id
      GROUP BY game_id, g.name, g.box_art
      ORDER BY users desc
      LIMIT 3
    `)
    res.status(200).json(query[0]);
  } catch (err) {
    res.status(400).json(err);
  } 
})


module.exports = router;
