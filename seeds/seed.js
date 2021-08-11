const sequelize = require('../config/connection');
const { User, Game, UserGames } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const userGamesData = require('./userGamesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const games = await Game.bulkCreate(gameData);

  const userGames = await UserGames.bulkCreate(userGamesData);

  // User Table
  //   {
  //     "userId": "salId",
  //     "name": "Sal",
  //     "email": "sal@hotmail.com",
  //     "password": "password12345",
  //     "gamertag": "Salamander1234"
  //   },

  // Game Table
  //  {
  //   "gameId": "some uuid",
  //   "name": "Street Fighter V",
  //   "boxArt": "blah URL"
  //  },

  // UserGames
  // {
  //   "userId": "salId"
  //   "gameId": "some uuid"
  // }
  
  // select * from usergames ug join user u on ug.userId = u.userId join games g on ug.gameId = g.gameId

  // for (const user of users) {
  //   const currentGames = []
  //   for (let i = 0; i < 3; i++) {
  //     let gameIndex = Math.floor(Math.random() * gameData.length)
  //     while (currentGames.includes(gameIndex)) {
  //       gameIndex = Math.floor(Math.random() * gameData.length)
  //     }
  //     console.log('!!', user)      
  //     const game = gameData[gameIndex]
  //     console.log('??', game)
  //     await UserGames.create({
  //       game_id: game.id,
  //       user_id: user.id
  //     })
  //   }  
  // }

  process.exit(0);
};

seedDatabase();