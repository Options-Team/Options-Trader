const conn = require('./conn');
const User = require('./User');
const Assessment = require('./Assessment');
const Message = require('./Message')

Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const [moe1,] = await Promise.all([
    Message.create({ txt: 'hi', fromId: moe.id, toId: lucy.id }),
    // Message.create({ txt: 'hello', fromId: moe.id, toId: ethyl.id }),
    // Message.create({ txt: 'hi there moe ', fromId: lucy.id, toId: moe.id }),
    // Message.create({ txt: 'oh hey there, nice to hear from you!', fromId: ethyl.id, toId: moe.id }),
  ]);
  const moe2 = await  Message.create({ txt: 'hello', fromId: moe.id, toId: ethyl.id })
  const lucy1 = await Message.create({ txt: 'hi there moe ', fromId: lucy.id, toId: moe.id })
  const ethyl1 = await  Message.create({ txt: 'oh hey there, nice to hear from you!', fromId: ethyl.id, toId: moe.id })
  const moe3 = await      Message.create({ txt: 'hows it going??', fromId: moe.id, toId: lucy.id })
  const moe4 = await  Message.create({ txt: "haven't talked in a while!", fromId: moe.id, toId: ethyl.id })
  const lucy2 = await   Message.create({ txt: 'good without your financial advice!', fromId: lucy.id, toId: moe.id })
  const ethyl2 = await  Message.create({ txt: "Yea that's cause you gave me bad fincancial advice!!" , fromId: ethyl.id, toId: moe.id })
  

  await Assessment.create({score: 25, userId: moe.id});

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl
    },

    messages: {
      moe1, moe2, lucy1, ethyl1, moe3, moe4, lucy2, ethyl2
    }
  };
};

Assessment.belongsTo(User);

module.exports = {
  syncAndSeed,
  User,
  Assessment,
  Message
};
