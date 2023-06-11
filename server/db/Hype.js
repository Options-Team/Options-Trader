const conn = require('./conn');
const { UUID, UUIDV4 } = conn.Sequelize;

const Hype = conn.define('hype', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    toId: {
        type: UUID,
        allowNull: false
    },
    fromId: {
        type: UUID,
        // allowNull: false
    },
});

module.exports = Hype;