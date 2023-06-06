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
});

module.exports = Friend;