const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');


Game.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
      model: UserGames,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'games_allUsers'
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