const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const bodyParser = require('body-parser');

module.exports = app =>
{
    const Users = app.config.db.models.Users;
    const cfg = app.config;

    var opts = {};
    opts.jwtFromRequest = req =>
    {
        var token = null;
        if (req && req.cookies)
        {
            token = req.cookies['access_token'];
        }
        return token;
    };
    opts.secretOrKey = cfg.jwtSecret;

    const strategy = new Strategy(opts, (payload, done) =>
    {
        Users.findById(payload.id)
            .then(({ dataValues: user }) =>
            {
                if(user.password == payload.password)
                {
                    return done(null, user);
                }
                return done("Access token is expired.", false);
            })
            .catch(error => done(error, null));
    });
    
    passport.use(strategy);

    app.use(passport.initialize());
    app.use(passport.session());
    
    return (
    {
        authenticate: () =>
        {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    });
};
