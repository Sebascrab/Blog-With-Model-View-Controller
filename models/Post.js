


const sequelize = require('../config/connection');

// from sequelize:
const { Model, DataTypes } = require('sequelize');


// creating our model for Posts:
class Post extends Model {}

Post.init (
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
                type: DataTypes.STRING,
                allowNull: false,
        },
        post_content: {
                type: DataTypes.TEXT,
                allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', 
                key: 'id'
             }
          }
        },
        
        {
            sequelize,
            modelName: 'post',
            underscored: true,
            freezeTableName: true
        }
    
);

module.exports = Post;

