const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT} = conn.Sequelize;

const Stock = conn.define('stock', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    currentPrice: {
        type: FLOAT,
        validate : {
            isFloat: true,
        }
    },
    ticker: {
        type: STRING,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    }
});

module.exports = Stock;