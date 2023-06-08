const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, VIRTUAL, INTEGER, ENUM } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const socketMap = require('../socketMap');
const Stock = require('./Stock');
const JWT = process.env.JWT;

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/
const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true,
    }
  },
  googleClientID:{
    type: STRING
  },
  avatar: {
    type: TEXT,
    // get: function(){
    //   const prefix = 'data:image/png;base64,';
    //   const data = this.getDataValue('avatar');
    //   if(!data){
    //     return data;
    //   }
    //   if(data.startsWith(prefix)){
    //     return data;
    //   }
    //   return `${prefix}${data}`;
    // }
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  phone: {
      type: STRING,
      validate: {
          function(v) {
              return phoneValidationRegex.test(v); 
          },
      }
  },
  countryOfCitizenship: {
    type: STRING
  },
  address: {
    type: STRING
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  zipCode: {
    type: STRING,
    validate: {
      len: 5,
      isNumeric: true,
    }
  },
  DOBDate: {
    type: STRING
  },
  DOBMonth: {
    type: STRING
  },
  DOBYear: {
    type: STRING
  },
  DOB: {
    type: VIRTUAL,
    get() {
      return `${this.DOBMonth}/${this.DOBDate}/${this.DOBYear}`;
    }
  },
  accountType: {
    type: ENUM,
    values: ['INDIVIDUAL', 'JOINT', 'IRA'],
    defaultValue: 'INDIVIDUAL'
  },
  SSID: {
    type: INTEGER,
    validate: {
      len: 9
    }
  },
  employmentStatus: {
    type: ENUM,
    values: ['Student', 'Employed Full-Time', 'Employed Part-Time', 'Not Currently Employed', 'Self Employed'],
  },
  affiliations: {
    type: BOOLEAN
  },
  affiliationNYSE: {
    type: BOOLEAN
  },
  proSubcriber: {
    type: BOOLEAN
  },
  directorOrShareholder: {
    type: BOOLEAN
  },
  approximateAnnualIncome: {
    type: ENUM,
    values: ['25,000', '50,000', '75,000', '100,000', '150,000','200,000', '300,000'],
  },
  approximateTotalNetWorth: {
    type: ENUM,
    values: ['50,000', '100,000', '150,000','200,000', '300,000','400,000', '600,000', '1,000,000'],
  },
  approximateLiquidNetWorth: {
    type: ENUM,
    values: ['50,000', '75,000', '100,000','120,000', '150,000', '200,000', '300,000', '400,000', '600,000'],
  },
  sourceOfIncome: {
    type: ENUM,
    values: ['Employment', 'Inheritence', 'Investments', 'Crypto'],
  },
  accountFundingMethod: {
    type: ENUM,
    values: ['Checking', 'Savings', 'Crypto'],
  },
  tradingYearsOfExperience: {
    type: INTEGER 
  },
});

User.prototype.messagesForUser = function(){
  return conn.models.message.findAll({
    order: [['createdAt']],
    where: {
      [conn.Sequelize.Op.or] : [
        {
          toId: this.id,
        },
        {
          fromId: this.id,
        }
      ]
    },
    include: [
      {
        model: User, as: 'from',
        attributes: ['username', 'id']
      },
      {
        model: User, as: 'to',
        attributes: ['username', 'id']
      }
    ]
  });
};

User.prototype.sendMessage = async function (message){
  message = await conn.models.message.create({...message, fromId: this.id})
  
  message = await conn.models.message.findByPk(
    message.id,
    { include: [
        {
          model: User, as: 'from',
          attributes: ['username', 'id']
        },
        {
          model: User, as: 'to',
          attributes: ['username', 'id']
        }
      ]
    }
  )
  if(socketMap[message.toId]){
    socketMap[message.toId].socket.send(JSON.stringify({ type: 'CREATE_MESSAGE', message}));
  }
  return message;
}

// User.prototype.createTransaction = async function(){
//   const portfolio = await this.getPortfolio();
//   portfolio.isPortfolio = false;
//   await portfolio.save();
//   return portfolio;

// }

// User.prototype.getPortfolio = async function(){
//   let userTransactions = await conn.models.transaction.findAll({
//     where: {
//       userId: this.id
//     }
//   });
//   if(!userTransactions){
//      const portfolio = {};
//      return portfolio;
//   }
//   const portfolio = (userTransactions) => {
//     const obj = {};
//     for(let i = 0; i < userTransactions.length; i++){
//       {
//         AAPL: {
//           shares: 10,
//           costBasis: valuePaidTotal,
//           value: shares * currenValue
//         },
//         AMZN:{
//           shares: 2,
//           costBasis: valuePaidTotal,
//           value: shares * currenValue
//         }
//       }
//     }
//   };
// }

User.prototype.getPortfolio = async function(){
  let userTransactions = await conn.models.transaction.findAll({
    include: [
      User,
      Stock
    ],
    where: {
      userId: this.id
    },
    
  });
  if(!userTransactions){
     const portfolio = {};
     return portfolio;
  }
  const portfolio = (userTransactions) => {
    const obj = {};
    for(let i = 0; i < userTransactions.length; i++){
      let currTransaction = userTransactions[i]
      //console.log(obj)
      console.log(currTransaction['shares'], currTransaction.shares)
      if(obj[currTransaction['stock']['ticker']]){
        //console.log(obj[currTransaction['stock']['ticker']]['Shares'])
        obj[currTransaction['stock']['ticker']]['Shares'] += currTransaction.shares
        obj[currTransaction['stock']['ticker']]['Cost_Basis'] += currTransaction.transactionValue
        obj[currTransaction['stock']['ticker']]['Current_Value'] += currTransaction.transactionValue 
      } else {
        obj[currTransaction['stock']['ticker']] = {
        'Stock': currTransaction.stock.name,
        'Ticker': currTransaction.stock.ticker,
        'Shares': currTransaction.shares,
        "Price": currTransaction.purchasePrice,
        'Cost_Basis': currTransaction.transactionValue,
        'Value': currTransaction.transactionValue,
        'Current_Value': (currTransaction.stock.currentPrice * currTransaction.shares) /  (currTransaction.transactionValue * currTransaction.shares)
         // 'Stock Id': currTransaction.dataValues.stockId,
      }
    }
     //  (obj[currTransaction['stock']['ticker']]['Shares'] + currTransaction.shares) * currTransaction.stock.currentPrice
      
      
    }
    console.log(obj)
    return obj
  };
  return portfolio(userTransactions)
}



  // portfolio = await conn.models.transaction.findByPk(
  //   portfolio.id,
  //   {
  //     include: [
  //       {
  //         model: conn.models.transaction,
  //         include: [
  //           conn.models.stock
  //         ]
  //       }
  //     ]
  //   }
  // );
//   return portfolio;
// }

// User.prototype.addToPortfolio = async function({ stock, shares}){
//   const portfolio = await this.getPortfolio();
//   let transaction = portfolio.transactions.find( transaction => {
//     return transaction.stockId === stock.id; 
//   });
//   if(transaction){
//     transaction.shares += shares;
//     await transaction.save();
//   }
//   else {
//     await conn.models.transaction.create({ orderId: portfolio.id, stockId: stock.id, shares });
//   }
//   return this.getPortfolio();
// };

// User.prototype.removeFromPortfolio = async function({ stock, sharesToRemove}){
//   const portfolio = await this.getPortfolio();
//   const transaction = portfolio.transactions.find( transaction => {
//     return transaction.stockId === stock.id; 
//   });
//   transaction.shares = transaction.shares - sharesToRemove;
//   if(transaction.shares > 0){
//     await transaction.save();
//   }
//   else {
//     await transaction.destroy();
//   }
//   return this.getPortfolio();
// };


User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ username, password }){
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

User.authenticateGoogle = async function(credentials){
  console.log('USER DB TEST TEST TEST TEST');
  console.log(credentials);
  console.log(credentials.given_name);
  let user = await User.findOne({
    where:{
      username: credentials.given_name,
      // email: credentials.email,
      // firstName: credentials.given_name,
      // lastName: credentials.family_name
    }
  });
  console.log(user);
  if(!user){
    user = await User.create({
      username: credentials.given_name,
      password: await bcrypt.hash(credentials.given_name, 5)
      // email: credentials.email,
      // firstName: credentials.given_name,
      // lastName: credentials.family_name
    });
  }
  console.log('THIS IS THE USER');
  console.log(user);
  return user.generateToken();
}

module.exports = User;

