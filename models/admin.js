var bcrypt = require("bcrypt");

module.exports = (sequelize, DataType) =>
{
    "use strict";
    var Admin = sequelize.define("Admin",
    {
        name:
        {
            type: DataType.STRING,
            allowNull: false,
            validate:
            {
                notEmpty: true
            }
        },
        password:
        {
            type: DataType.STRING,
            allowNull: false,
            validate:
            {
                notEmpty: true
            }
        }
    },
    {
        hooks:
        {
            beforeCreate: user =>
            {
                var salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    Admin.isPassword = (encodedPassword, password) =>
    {
        return bcrypt.compareSync(password, encodedPassword);
    };

    return Admin;
};