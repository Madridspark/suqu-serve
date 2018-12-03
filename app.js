var express = require("express");
var consign = require("consign");

var app = express();

consign(
{
    locale: 'zh-cn',
    verbose: false
})
.include("config.js")
.then("config/db.js")
.then("config/setting.js")
.then("config/auth.js")
.then("init.js")
.then("routes")
.into(app);

const server = app.listen(3000, () =>
{
    var port = server.address().port;
  
    console.log(`Server listening at http://localhost:${port}`);
});