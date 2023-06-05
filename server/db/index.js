const conn = require('./conn');
const User = require('./User');
const Assessment = require('./Assessment');
const Message = require('./Message')
const Stock = require('./Stock')
const Transaction = require('./Transaction');
// const { response } = require('express');
const axios = require('axios');
const Portfolio = require('./Portfolio');
require('dotenv').config()

Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });
Transaction.belongsTo(User);
Transaction.belongsTo(Stock);
Transaction.belongsTo(Portfolio);
Portfolio.belongsTo(User)



const syncAndSeed = async()=> {
  await conn.sync({ force: true });

  const sp500List = 'AAPL, MSFT, AMZN, GOOGL, META, JPM, JNJ, V, PG, NVDA, TSLA, PYPL, UNH, HD, BAC, DIS, MA, VZ, XOM, CMCSA, PFE, NFLX, ADBE, T, CSCO, ABT, MRK, CRM, ORCL, NKE, ABBV, BMY, AVGO, CVX, WMT, MCD, PEP, COST, TMO, WFC, C, KO, AMD, UPS, GILD, AON, LIN, DUK, PM, CME, GM, MET, ISRG, A, TXN, SPGI, TGT, LOW, COP, BKNG, NOW, DHR, CTSH, ADP, AON, COST, AXP, LMT, GD, USB, COF, ADI, HON, APD, DD, MU, REGN, SPG, ITW, MAR, FISV, DOW, KMB, EMR, MDLZ, WBA, AMCR, RMD, ANSS, ECL, CCI, CB, CTAS, PSA, TJX, TROW, GWW, YUM, SRE, EQIX, DTE, ZTS, FRC, OKE, ZBRA, NTAP, NLOK, QRVO, MTD, AWK, EA, PAYX, FIS, MKC, KLAC, IEX, ROST, LHX, VRSK, DLR, RCL, VTR, BLL, ALXN, PPL, CERN, STE, RSG, ALGN, PEG, CTLT, CNC, CDNS, ABMD, MSCI, ANET, IDXX, IQV, CHTR, CPRT, PTON, CTVA, FTNT, TWTR, CARR, TSCO, EXPE, SNPS, TPR, AIZ, PAYC, HLT, CDW, WLTW, SWKS, MKTX, NVR, INCY, MHK, TYL, LH, JKHY, LDOS, ZTS, CINF, IPGP, PH, BF.B, DRI, TFX, KEYS, SIVB, CMA, WRB, PGR, ROP, MGM, VNO, OMC, CCL, PVH, HAS, EXR, NUE, IP, HFC, ALB, APA, NCLH, TAP, MAC, HES, KSS, LEN, NRG, NOV'

  const secondSetSP200 = 'HIG, AIV, COG, VMC, RL, CPB, BEN, RHI, XRX, CXO, GPS, CF, CTL, JWN, FLS, JEF, FL, DVN, PBCT, RLGY, NLSN, PFG, UA, PBF, HBI, MRO, AAP, LUMN, OMC, AES, HPQ, DXC, VNO, IPG, FANG, WYNN, UAA'



const options = {
  method: 'GET',
  url: 'https://mboum-finance.p.rapidapi.com/qu/quote',
  params: {
    symbol: `${sp500List}`
  },
  headers: {
    'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
  for(let i = 0; i < response.data.length; i++) {
    let stock = response.data[i]
    await Stock.create({ currentPrice: `${stock.ask}` , ticker: `${stock.symbol}`, name: `${stock.shortName}` })
  }
} catch (error) {
	console.error(error);
}

  

  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  const [moe1,] = await Promise.all([
    Message.create({ txt: 'hi', fromId: moe.id, toId: lucy.id }),
  ]);
  const moe2 = await Message.create({ txt: 'hello', fromId: moe.id, toId: ethyl.id })
  const lucy1 = await Message.create({ txt: 'hi there moe ', fromId: lucy.id, toId: moe.id })
  const ethyl1 = await Message.create({ txt: 'oh hey there, nice to hear from you!', fromId: ethyl.id, toId: moe.id })
  const moe3 = await Message.create({ txt: 'hows it going??', fromId: moe.id, toId: lucy.id })
  const moe4 = await Message.create({ txt: "haven't talked in a while!", fromId: moe.id, toId: ethyl.id })
  const lucy2 = await Message.create({ txt: 'good without your financial advice!', fromId: lucy.id, toId: moe.id })
  const ethyl2 = await Message.create({ txt: "Yea that's cause you gave me bad fincancial advice!!" , fromId: ethyl.id, toId: moe.id })
  

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
  Message,
  Stock,
  Transaction,
  Portfolio
};
