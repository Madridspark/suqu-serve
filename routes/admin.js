module.exports = app =>
{
    "use strict";
    const Admin = app.config.db.models.Admin;

    app.post("/api/login", (req, res) =>
    {
        const { id, password } = req.body;

        if(id && password)
        {
            Admin.findById(id)
                .then(user =>
                {
                    if(Admin.isPassword(user.password, password))
                    {
                        const payload = (
                        {
                            id: user.id,
                            password: user.password
                        });
                        res.cookie("access_token", jwt.encode(payload, cfg.jwtSecret));
                        res.json(
                        {
                            success: true,
                            user:
                            {
                                id: user.id,
                                name: user.name
                            }
                        });
                    }
                    else
                    {
                        res.sendStatus(401);
                    }
                })
                .catch(error => res.sendStatus(401));
        }
        else
        {
            res.sendStatus(401);
        }
    });

    app.get("/api/logout", (req, res) =>
    {
        res.clearCookie("access_token");
        res.json(
        {
            success: true
        });
    });

    app.post("/super/admin", (req, res) =>
    {
        Admin.create(req.body)
            .then(ret => res.json(ret))
            .catch(err =>
            {
                res.status(412).json({msg: err.message});
            });
    });
}