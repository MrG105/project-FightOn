const router = require("express").Router();
const { User, Game, UserGames } = require("../../models/");
// const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
      // Get all users, sorted by name
      const userData = await User.findAll({
         attributes: {  exclude: ['password', 'email'],}
            // order: [['name', 'ASC']],
      });
        
        const users = userData.map((user) => user.get({ plain: true})); 

       res.render('users', { users }) 

    //   res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
      }
    });

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// add game to user
// readd auth later
router.post('/game', async (req, res) => {
    try {
        const userData = await UserGames.create({user_id: req.body.user_id, game_id:req.body.game_id});
        res.status(200).json(userData);        
    } catch (err) {
        res.status(400).json(err);
    }
});

// get games of user by id
// currently set to 1,change to session id

router.get('/games/:id', async (req, res) => {
    try {
        const gameData = await User.findOne(req.session.user_id, {
            where: {
                id: req.session.user_id
                // req.session.user_id = gameData.id,
            },
            include: [{ all: true, nested: true }]
            
        });
        if (!gameData) {
            res.status(404).json({ message: 'No Games found with this id!' });
            return;
        }
        res.status(200).json(gameData);        
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.get('/games/:id', async (req, res) => {
//     try {
//         const gameData = await Game.findAll({
//             where: {
//                 user_id: 1
//             },
//             include: {
//                 // model: UserGames,
//                 include: [{model: User, through: UserGames}]

//             }

//             // include: [
//             //     Game, User
//             // ]
//             // console.log('!.!.', gameData);
//         });
//         if (!gameData) {
//             res.status(404).json({ message: 'No Games found with this id!' });
//             return;
//         }
//         res.status(200).json(gameData);        
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });


// login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
