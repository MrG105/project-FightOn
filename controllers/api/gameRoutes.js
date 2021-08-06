const router = require("express").Router();
const  { User, Game } = require("../../models/");
const withAuth = require('../../utils/auth');

// find all games (with auth required)
router.get('/', withAuth, async (req, res) => {
    try {
      const gameData = await Game.findAll({
          where: {
              user_id: req.session.userId
          }
      });
      res.render("all-games", { 
          layout: 'INSERT SOMETHING HERE JACOB',
          gameData
         });
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