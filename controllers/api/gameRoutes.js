const router = require("express").Router();
const  { User, Game } = require("../../models/");
const withAuth = require('../../utils/auth');


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
      const newGame = await Game.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newGame);
    } catch (err) {
      res.status(400).json(err);
    }
});



module.exports = router;
