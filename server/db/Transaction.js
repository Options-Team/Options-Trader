const conn = require('./conn');
const { STRING, UUID, UUIDV4, FLOAT, TEXT, BOOLEAN, INTEGER, DATEONLY, ENUM, VIRTUAL} = conn.Sequelize;

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
        type: FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    transactionDate: {
        type: DATEONLY,
        allowNull: false,
        
    },
    transactionMethod: {
        type: ENUM,
        values: ['Buy', 'Sell'],
        defaultValue: 'Buy'
    },
    transactionValue: {
        type: VIRTUAL,
        get(){
            return this.purchasePrice * this.shares;
        }
    }
});

module.exports = Transaction;