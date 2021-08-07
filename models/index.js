const User = require('./User');
const Game = require('./Game');

Game.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Game, {
    foreignKey: 'user_id',
});


module.exports = {User, Game};