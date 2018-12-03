var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");

let db = null;

module.exports = app =>
{
    "use strict";
    if (!db)
    {
        var config = app.config;
        var sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db =
        {
            sequelize,
            Sequelize,
            models: {}
        };

        fs.readdirSync(config.models).forEach(file =>
        {
            var modelDir = path.join(config.models, file);
            var model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key =>
        {
            const connet = db.models[key].associate;
            connet && connet(db.models);
        });
    }
    return db;
};