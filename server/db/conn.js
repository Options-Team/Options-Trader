const Sequelize = require('sequelize');
const config = {
};

if(process.env.QUIET){
  config.logging = false;
}

// const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/options_trader_db', config);
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:abcde@localhost:5432/options_trader_db', config);

//line 9 is for Wahab's windows local machine. comment it out and use line 8.

module.exports = conn;
