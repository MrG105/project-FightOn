const router = require("express").Router();
const { User, Game } = require("../models/");
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// render main page
router.get('/',  async (req, res) => {
  try {
    let topGames = await sequelize.query(`
    SELECT COUNT(user_id) as users, game_id, g.name, g.box_art as boxArt
    FROM user_games ug
    JOIN game g ON ug.game_id = g.id
    GROUP BY game_id, g.name, g.box_art
    ORDER BY users desc
    LIMIT 3
    `)
    console.log(topGames[0]);
    // const games = query.map((game) => game.get({ plain: true }));

    res.render('homepage', { topGames: topGames[0] }
    //   , {
    //     logged_in: req.session.logged_in
    // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup')
});

router.get('/dashboard', (req, res) => {
  if (! req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('dashboard', {
    logged_in: req.session.logged_in,
  })
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/dashboard', (req, res) => {
    if (! req.session.logged_in) {
      res.redirect('/login');
      return;
    }
  
    res.render('dashboard')
  });
module.exports = router;