module.exports =
{
    database: "suqu",
    username: "admin",
    password: "aFRtXGC9QeqS",
    params:
    {
        dialect: "sqlite",
        storage: `${__dirname}/db.sqlite`,
        define: {
            underscored: true
        }
    },
    models: `${__dirname}/models`,
    static: `${__dirname}/public`,
    jwtSecret: "45ye4tyhw34b45e7nj67eh4",
    jwtSession: {session: false},

    appID: 'wx52ba90ed2cd4d076',
    appSecretID: 'df68c17148379f6ca684227c8693cc0b'
};