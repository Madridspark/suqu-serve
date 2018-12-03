module.exports = ({ config: { db } }) =>
{
    db.sequelize.sync()
        .then(() =>
        {
            console.log("--------------------- init ---------------------");
        })
        .catch(err =>
        {
            console.log(err);
        })
};