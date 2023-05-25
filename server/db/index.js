const conn = require('./conn');
const User = require('./User');
const Assessment = require('./Assessment');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  await Assessment.create({score: 25, userId: moe.id});

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl
    }
  };
};

Assessment.belongsTo(User);

module.exports = {
  syncAndSeed,
  User,
  Assessment
};
