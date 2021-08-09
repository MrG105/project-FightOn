const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserGames extends Model {}

UserGames.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName:'user_games'
    }
);

module.exports = UserGames;
