const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT, TEXT, BOOLEAN, INTEGER, DATEONLY, ENUM} = conn.Sequelize;

const Transaction = conn.define('transaction', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    purchasePrice: {
        type: FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    shares: {
        type: INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transactionDate: {
        type: DATEONLY,
        allowNull: false,
        
    },
    transactionValue: {
        type: FLOAT,
    },
    transactionMethod: {
        type: ENUM,
        values: ['Buy', 'Sell'],
        defaultValue: 'Buy'
    }
});

module.exports = Transaction;