


const sequelize = require('../config/connection');

// sequelize tools:
const { Model, Datatypes } = require('sequelize');

class Coment extends Model {}

Comment.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: Datatypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'post', 
                key: 'id'
            }
        },
        user_id: {
            type: Datatypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'user',
                key: 'id'
            }
        },
        comment_text: {
            type: Datatypes.STRING, 
            allowNull: false,
            validdate: {
                len: [1]
            }
        }
    },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;