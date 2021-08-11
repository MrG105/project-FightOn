const router = require("express").Router();
const  { User, Game } = require("../../models/");
const withAuth = require('../../utils/auth');

//   router.get('/', async (req, res) => {
  //     try {
    //       const gameData = await Game.findAll({
      //         include: [{ model: User,
      //         attributes: { 
        //           exclude: ['password', 'email']
        //         }}],
        //         group: ['User']
        //       }); 
        //       res.status(200).json(gameData);
        //       // res.render("all-games", { 
          //       //     layout: 'INSERT SOMETHING HERE JACOB',
          //       //     gameData
          //       //    });
          //     } catch (err) {
            //       res.status(500).json(err);
            //       res.redirect('login');
            //     }
            // });
            
// // find all games
router.get('/', async (req, res) => {
  try {
    const gameData = await Game.findAll(); 
    // res.status(200).json(gameData);
    res.render("allgames", gameData);
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
