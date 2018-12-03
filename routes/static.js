var express = require("express");

module.exports = app =>
{
    "use strict";
    app.use(express.static('public'));

    app.get('/', (req, res) =>
    {
        res.render("index.html");
    });
}