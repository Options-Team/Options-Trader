const conn = require('./conn');
const { ENUM, UUID, UUIDV4 } = conn.Sequelize;

const Friend = conn.define('friend', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  status: {
    type: ENUM,
    values: ['Pending', 'Accepted'],
    defaultValue: 'Pending'
  },
  toId: {
    type: UUID,
    allowNull: false
  },
  fromId: {
    type: UUID,
    allowNull: false
  },
  

});

module.exports = Friend;