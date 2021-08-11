const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');

// User.belongsToMany(Game, {
//     through: UserGames,
//     // foreignKey: 'user_id',
// });

// Game.belongsToMany(User, {
//     through: UserGames,
//     // foreignKey: 'game_id',
// });

// User.hasMany(Game)

Game.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
      model: UserGames,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'user_allGames'
  });
  
  User.belongsToMany(Game, {
    // Define the third table needed to store the foreign keys
    through: {
      model: UserGames,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'user_selectedGames'
  });

module.exports = {User, Game, UserGames};