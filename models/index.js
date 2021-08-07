const User = require('./User');
const Game = require('./Game');

Game.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Game, {
    foreignKey: 'game_id',
});


module.exports = {User, Game};