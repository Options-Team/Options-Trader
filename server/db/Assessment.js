const conn = require('./conn');
const { UUID, UUIDV4, INTEGER } = conn.Sequelize;

const Assessment = conn.define('assessment', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  score: {
    type: INTEGER
  }
});

module.exports = Assessment;