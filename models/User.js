const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {}

//define table columns and config
User.init(
    {
        //define an id column
        id: {
            //use the special sequelize datatypes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of sql's NOT NULL option
            allowNull: false,
            //instruct that this is primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data thru validators before creating table data
            validate: {
                isEmail: true
            }
        },
        //define a pw column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the pw is at least four characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        //Table config options go here
        //pass in our imported sequelize connection (direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing(ie 'comment_text not "commentText"
        underscored: true,
        //make it so our model name stays lowercase in the db
        modelName: 'user'
    }
);

module.exports = User;