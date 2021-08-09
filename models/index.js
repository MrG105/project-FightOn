const User = require('./User');
const Game = require('./Game');
const UserGames = require('./UserGames');

User.belongsToMany(Game, {
    through: UserGames,
    foreignKey: 'user_id',
});

Game.belongsToMany(User, {
    through: UserGames,
    foreignKey: 'game_id',
});



module.exports = {User, Game, UserGames};