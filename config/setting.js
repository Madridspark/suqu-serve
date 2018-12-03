const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const expressSession = require('express-session');

module.exports = app =>
{
    "use strict";
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressSession(
    {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    
    // app.use(compression());
    // app.use(helmet());
    // app.use(morgan("common", {
    //     stream: {
    //         write: (message) => {
    //             logger.info(message);
    //         }
    //     }
    // }));

    app.use(cors(
    {
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    // app.use((req, res, next) =>
    // {
    //     if (req.body && req.body.id)
    //     {
    //         delete req.body.id;
    //     }
    //     next();
    // });

    app.use(express.static(app.config.static));
};