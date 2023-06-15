const conn = require('./conn');
const User = require('./User');
const Assessment = require('./Assessment');
const Message = require('./Message')
const Stock = require('./Stock')
const Friend = require('./Friend')
const Hype = require('./Hype')
const Transaction = require('./Transaction');
// const { response } = require('express');
const axios = require('axios');
require('dotenv').config()

Message.belongsTo(User, { as: 'from' });
Message.belongsTo(User, { as: 'to' });
Transaction.belongsTo(User);
Transaction.belongsTo(Stock);
Friend.belongsTo(User, { as: 'from' });
Friend.belongsTo(User, { as: 'to' });
Hype.belongsTo(User, { as: 'from' });
Hype.belongsTo(User, { as: 'to' });

const syncAndSeed = async()=> {
  await conn.sync({ force: true });

  //const sp500List = 'AAPL, MSFT, AMZN, GOOGL, META, JPM, JNJ, V, PG, NVDA, TSLA, PYPL, UNH, HD, BAC, DIS, MA, VZ, XOM, CMCSA, PFE, NFLX, ADBE, T, CSCO, ABT, MRK, CRM, ORCL, NKE, ABBV, BMY, AVGO, CVX, WMT, MCD, PEP, COST, TMO, WFC, C, KO, AMD, UPS, GILD, LIN, DUK, PM, CME, GM, MET, ISRG, A, TXN, SPGI, TGT, LOW, COP, BKNG, NOW, DHR, CTSH, ADP,  LMT, GD, USB, COF, ADI, HON, APD, DD, MU, REGN, SPG, ITW, MAR, FISV, DOW, KMB, EMR, MDLZ, WBA, AMCR, RMD, ANSS, ECL, CCI, CB, CTAS, PSA, TJX, TROW, GWW, YUM, SRE, EQIX, DTE, ZTS, FRC, OKE, ZBRA, NTAP, NLOK, QRVO, MTD, AWK, EA, PAYX, FIS, MKC, KLAC, IEX, ROST, LHX, VRSK, DLR, RCL, VTR, BLL, ALXN, PPL, CERN, STE, RSG, ALGN, PEG, CTLT, CNC, CDNS, ABMD, MSCI, ANET, IDXX, IQV, CHTR, CPRT, PTON, CTVA, FTNT, TWTR, CARR, TSCO, EXPE, SNPS, TPR, AIZ, PAYC, HLT, CDW, WLTW, SWKS, MKTX, NVR, INCY, MHK, TYL, LH, JKHY, LDOS, CINF, IPGP, PH, BF.B, DRI, TFX, KEYS, SIVB, CMA, WRB, PGR, ROP, MGM, VNO, OMC, CCL, PVH, HAS, EXR, NUE, IP, HFC, ALB, NCLH, TAP, MAC, HES, KSS, LEN, NRG, NOV'

 // const secondSetSP200 = 'HIG, AIV, COG, VMC, RL, CPB, BEN, RHI, XRX, CXO, GPS, CF, CTL, JWN, FLS, JEF, FL, DVN, PBCT, RLGY, NLSN, PFG, UA, PBF, HBI, MRO, AAP, LUMN, OMC, AES, HPQ, DXC, VNO, IPG, FANG, WYNN, UAA, MMM, AOS, ACN,ATVI,ADM, AFL, A, AKAM, ALK,ALLE,LNT,ALL,GOOG,MO,AEE,AAL,AEP,AXP,AIG,AMT,AMP,ABC,AME,AMGN,APH, ANTM,AON,AMAT,APTV,AJG,T,ATO,ADSK,AZO,AVB,AVY,BKR,BBWI,BAX,BDX,BRK.B,BBY,BIO,TECH,BIIB,BLK,BK,BA,BWA,BXP,BSX,BR,BRO,CHRW,CZR,CAH ,KMX'

 // const thirdSet = 'CTLT,CAT,CBOE,CBRE,CDW,CE,CNC,CNP,CDAY,CERN,CF,CRL,SCHW,CHTR,CVX,CMG,CB,CHD,CI,CINF,CTAS,CSCO,C,CFG,CTXS,CLX,CME,CMS,KO,CTSH,CL,CAG,ED,STZ,GLW,CTRA,CSX,CMI,CVS,DHI,DV,DE,DAL,XRAY,DXCM,DFS,DISCA,DISCK,DISH,DG,DLTR,D,DPZ,DOV,DRE,EMN,ETN,EBAY,EIX,EW,LLY,ENPH,ETR,EOG,EFX,EQR,ESS,EL,ETSY,RE,EVRG,ES,EXC,EXPD,FFIV,FB,FAST,FRT,FDX,FITB,FE,FLT,FMC,F,FTV,FBHS,FOXA,FOX,FCX,GRMN,IT,GNRC,GE,GIS,GPC,GPN,GL,GS,HAL,HCA, PEAK,HSIC,HPE,HOLX,HRL,HST,HWM,HUM,HBAN,HII,IBM,INFO,ILMN,IR,INTC,ICE,IFF,INTU,IVZ,IRM,JBHT, J'
   
  const sp500List = 'MMM,AOS,ABT,ABBV,ABMD,ACN,ATVI,ADM,ADBE,AAP,AMD,AES,AFL,A,APD,AKAM,ALB,ALK,ARE,ALGN,ALLE,LNT,ALL,GOOGL,GOOG,MO,AMZN,AMCR,AEE,AAL,AEP,AXP,AIG,AMT,AWK,AMP,ABC,AME,AMGN,APH,ADI,ANSS,ANTM,AON,APA,AAPL,AMAT,APTV,ANET,AJG,AIZ,T,ATO,ADSK,ADP,AZO,AVB,AVY,BKR,BLL,BAC,BBWI,BAX,BDX,BRK.B,BBY,BIO,TECH,BIIB,BLK,BK,BA,BKNG,BWA,BXP,BSX,BMY,AVGO,BR,BRO,BF.B,CHRW,CDNS,CZR,CPB,COF,CAH,KMX,CCL,CARR,CTLT,CAT,CBOE,CBRE,CDW,CE,CNC,CNP,CDAY,CERN,CF,CRL,SCHW,CHTR,CVX,CMG,CB,CHD,CI,CINF,CTAS,CSCO,C,CFG,CTXS,CLX,CME,CMS,KO,CTSH,CL,CMCSA,CMA,CAG,COP,ED,STZ,CPRT,GLW,CTVA,COST,CTRA,CCI,CSX,CMI,CVS,DHI,DHR,DRI,DVA,DE,DAL,XRAY,DVN,DXCM,FANG,DLR,DFS,DISCA,DISCK,DISH,DG,NWL,NEM,NWSA,NWS,NEE,NLSN,NKE,NI,NSC,NTRS,NOC,NLOK'
  
  const secondSetSP200 = 'DLTR,D,DPZ,DOV,DOW,DTE,DUK,DRE,DD,DXC,EMN,ETN,EBAY,ECL,EIX,EW,EA,LLY,EMR,ENPH,ETR,EOG,EFX,EQIX,EQR,ESS,EL,ETSY,RE,EVRG,ES,EXC,EXPE,EXPD,EXR,XOM,FFIV,FB,FAST,FRT,FDX,FIS,FITB,FRC,FE,FISV,FLT,FMC,F,FTNT,FTV,FBHS,FOXA,FOX,BEN,FCX,GPS,GRMN,IT,GNRC,GD,GE,GIS,GM,GPC,GILD,GPN,GL,GS,HAL,HBI,HAS,HCA,PEAK,HSIC,HES,HPE,HLT,HOLX,HD,HON,HRL,HST,HWM,HPQ,HUM,HBAN,HII,IBM,IEX,IDXX,INFO,ITW,ILMN,INCY,IR,INTC,ICE,IFF,IP,IPG,INTU,ISRG,IVZ,IPGP,IQV,IRM,JBHT,JKHY,J,SJM,JNJ,JCI,JPM,JNPR,KSU,K,KEY,KEYS,KMB,KIM,KMI,KLAC,KHC,KR,LHX,LH,LRCX,LW,LVS,LEG,LDOS,LEN,LNC,LIN,LYV,LKQ,LMT,L,LOW,LUMN,LYB,MTB,MRO,MPC,MKTX,MAR,MMC,MLM,MAS,MA,MTCH,MKC,MCD,MCK,MDT,MRK,MET,MTD,MGM,MCHP,MU,MSFT,MAA,MRNA,MHK,TAP,MDLZ,MPWR,MNST,MCO,MS,MSI,MSCI,NDAQ,NTAP,NFLX'

  const thirdSet = 'NCLH,NRG,NUE,NVDA,NVR,NXPI,ORLY,OXY,ODFL,OMC,OKE,ORCL,OGN,OTIS,PCAR,PKG,PH,PAYX,PAYC,PYPL,PENN,PNR,PBCT,PEP,PKI,PFE,PM,PSX,PNW,PXD,PNC,POOL,PPG,PPL,PFG,PG,PGR,PLD,PRU,PTC,PEG,PSA,PHM,PVH,QRVO,QCOM,PWR,DGX,RL,RJF,RTX,O,REG,REGN,RF,RSG,RMD,RHI,ROK,ROL,ROP,ROST,RCL,SPGI,CRM,SBAC,SLB,STX,SEE,SRE,NOW,SHW,SPG,SWKS,SNA,SO,LUV,SWK,SBUX,STT,STE,SYK,SIVB,SYF,SNPS,SYY,TMUS,TROW,TTWO,TPR,TGT,TEL,TDY,TFX,TER,TSLA,TXN,TXT,COO,HIG,HSY,MOS,TRV,DIS,TMO,TJX,TSCO,TT,TDG,TRMB,TFC,TWTR,TYL,TSN,USB,UDR,ULTA,UAA,UA,UNP,UAL,UPS,URI,UNH,UHS,VLO,VTR,VRSN,VRSK,VZ,VRTX,VFC,VIAC,VTRS,V,VNO,VMC,WRB,GWW,WAB,WBA,WMT,WM,WAT,WEC,WFC,WELL,WST,WDC,WU,WRK,WY,WHR,WMB,WLTW,WYNN,XEL,XLNX,XYL,YUM,ZBRA,ZBH,ZION,ZTS'

  const fourth = 'A,AA,AA$B,AAC,AAN,AAT,AAV,AB,ABB,ABBV,ABC,ABEV,ABG,ABM,ABR,ABR$A,ABR$B,ABR$C,ABRN,ABT,ABX,ACC,ACCO,ACE,ACG,ACH,ACI,ACM,ACMP,ACN,ACP,ACRE,ACT,ACW,ADC,ADM,ADPT,ADS,ADT,ADX,AEB,AEC,AED,AEE,AEG,AEH,AEK,AEL,AEM,AEO,AEP,AER,AES,AES$C,AET,AF,AF$C,AFA,AFB,AFC,AFG,AFGE,AFL,AFM,AFQ,AFSD,AFSI$A,AFSI$B,AFSI$C,AFT,AFW,AG,AGC,AGCO,AGD,AGI,AGM,AGM$A,AGM$B,AGM$C,AGM.A,AGN,AGO,AGO$B,AGO$E,AGO$F,AGRO,AGU,AGX,AHC,AHH,AHL,AHL$A,AHL$B,AHL$C,AHP,AHS,AHT,AHT$A,AHT$D,AHT$E,AI,AIB,AIF,AIG,AIG.W,AIN,AIR,AIT,AIV,AIV$A,AIV$Z,AIW,AIY,AIZ,AJG,AKO.A,AKO.B,AKP,AKR,AKS,AL,ALB,ALDW,ALE,ALEX,ALG,ALJ,ALK,ALL,ALL$A,ALL$B,ALL$C,ALL$D,ALL$E,ALL$F,ALLE,ALLY,ALLY$A,ALLY$B,ALP$N,ALP$O,ALP$P,ALR,ALR$B,ALSN,ALU,ALV,ALX,AM,AMBR,AMC,AME,AMFW,AMG,AMH,AMH$A,AMH$B,AMH$C,AMID,AMP,AMRC,AMRE,AMT,AMT$A,AMTD,AMTG,AMTG$A,AMX,AN,ANET,ANF,ANFI,ANH,ANH$A,ANH$B,ANN,ANR,ANTM,ANW,AOD,AOI,AOL,AON,AOS,AP,APA,APAM,APB,APC,APD,APF,APH,APL,APL$E,APO,APU,AR'
  
  const fifth = 'ARC,ARCO,ARCX,ARDC,ARE,ARE$E,ARES,ARG,ARH$C,ARI,ARI$A,ARL,ARMF,ARMK,ARN,ARO,ARP,ARP$D,ARPI,ARR,ARR$A,ARR$B,ARU,ARW,ARY,ASA,ASB,ASB$B,ASC,ASG,ASGN,ASH,ASPN,ASR,ASX,AT,ATE,ATEN,ATHM,ATI,ATK,ATLS,ATO,ATR,ATTO,ATU,ATV,ATW,AU,AUO,AUQ,AUY,AV,AVA,AVAL,AVB,AVD,AVG,AVH,AVIV,AVK,AVOL,AVP,AVT,AVV,AVX,AVY,AWF,AWH,AWI,AWK,AWP,AWR,AXE,AXL,AXLL,AXP,AXR,AXS,AXS$C,AXS$D,AXTA,AYI,AYN,AYR,AZN,AZO,AZZ,B,BA,BABA,BAC,BAC$D,BAC$E,BAC$I,BAC$L,BAC$W,BAC$Z,BAC.A,BAC.B,BAF,BAH,BAK,BALT,BAM,BANC,BANC$C,BAP,BAS,BAX,BBD,BBDO,BBF,BBG,BBK,BBL,BBN,BBT,BBT$D,BBT$E,BBT$F,BBT$G,BBVA,BBW,BBX,BBY,BC,BCA,BCC,BCE,BCEI,BCH,BCO,BCR,BCRH,BCS,BCS$,BCS$A,BCS$C,BCS$D,BCX,BDC,BDJ,BDN,BDN$E,BDX,BEE,BEL,BEN,BEP,BERY,BF.A,BF.B,BFAM,BFK,BFO,BFR,BFS,BFS$C,BFZ,BG,BGB,BGC,BGCA,BGE$B,BGG,BGH,BGR,BGS,BGT,BGX,BGY,BH,BHE,BHI,BHK,BHL,BHLB,BHP,BID,BIE,BIF,BIG,BIN,BIO,BIO.B,BIOA,BIOA.W,BIP,BIT,BITA,BJZ,BK,BK$C,BKD,BKE,BKH,BKK,BKN,BKS,BKT,BKU,BLH,BLK,BLL,BLOX,BLT,BLW,BLX,BMA,BME,BMI'

  const sixth = 'BML$G,BML$H,BML$I,BML$J,BML$L,BMO,BMR,BMS,BMY,BNJ,BNK,BNS,BNY,BOCA,BOE,BOH,BOI,BOOT,BORN,BOXC,BP,BPI,BPK,BPL,BPT,BPY,BPZ,BQH,BR,BRC,BRFS,BRK.A,BRK.B,BRO,BRP,BRS,BRSS,BRT,BRX,BSAC,BSBR,BSD,BSE,BSI,BSL,BSMX,BST,BSX,BT,BTA,BTE,BTF,BTH,BTO,BTT,BTU,BTZ,BUD,BUI,BURL,BVN,BWA,BWC,BWG,BWP,BWS,BX,BXC,BXE,BXMT,BXMX,BXP,BXP$B,BXS,BYD,BYM,BZH,BZT,C,C$C,C$J,C$K,C$L,C$N,C$P,C.A,C.B,CAB,CACI,CAE,CAF,CAG,CAH,CAJ,CALX,CAM,CAP,CAPL,CAS,CAT,CATO,CB,CBA,CBB,CBB$B,CBD,CBG,CBI,CBK,CBL,CBL$D,CBL$E,CBM,CBPX,CBR,CBS,CBS.A,CBT,CBU,CBZ,CCC,CCE,CCG,CCG$A,CCI,CCI$A,CCJ,CCK,CCL,CCM,CCO,CCS,CCSC,CCU,CCV,CCZ,CDE,CDE.W,CDI,CDR,CDR$B,CE,CEA,CEB,CEE,CEL,CELP,CEM,CEN,CEO,CEQP,CF,CFC$A,CFC$B,CFG,CFI,CFN,CFR,CFR$A,CFX,CGA,CGG,CGI,CHA,CHD,CHE,CHGG,CHH,CHK,CHK$D,CHKR,CHL,CHMI,CHMT,CHN,CHS,CHSP,CHSP$A,CHT,CHU,CI,CIA,CIB,CIE,CIEN,CIF,CIG,CIG.C,CII,CIM,CIO,CIR,CIT,CIVI'
  
  const seventh = 'CJES,CKH,CKP,CL,CLA,CLB,CLC,CLD,CLDT,CLF,CLGX,CLH,CLI,CLNY,CLNY$A,CLNY$B,CLR,CLS,CLV,CLW,CLX,CM,CMA,CMA.W,CMC,CMCM,CMG,CMI,CMK,CMLP,CMN,CMO,CMO$E,CMP,CMRE,CMRE$B,CMRE$C,CMS,CMS$B,CMU,CNA,CNC,CNCO,CNHI,CNI,CNK,CNL,CNNX,CNO,CNP,CNQ,CNS,CNW,CNX,CO,CODE,CODI,COF,COF$C,COF$D,COF$P,COF.W,COG,COH,COL,COO,COP,COR,COR$A,CORR,COT,COTY,COUP,COV,CP,CPA,CPAC,CPB,CPE,CPE$A,CPF,CPG,CPK,CPL,CPN,CPS,CPT,CR,CRC,CRCM,CRD.A,CRD.B,CRH,CRI,CRK,CRL,CRM,CRR,CRS,CRT,CRY,CS,CSC,CSG,CSH,CSI,CSL,CSLT,CSS,CST,CSTM,CSU,CSV,CSX,CTB,CTL,CTLT,CTQ,CTR,CTS,CTT,CTU,CTV,CTW,CTX,CTY,CUB,CUBE,CUBE$A,CUBI,CUBS,CUDA,CUK,CUZ,CVA,CVB,CVC,CVD,CVE,CVEO,CVG,CVI,CVO,CVRR,CVS,CVT,CVX,CW,CWEI,CWT,CX,CXE,CXH,CXO,CXP,CXW,CYD,CYH,CYN,CYN$C,CYN$D,CYNI,CYS,CYS$A,CYS$B,CYT,CZZ,D,DAC,DAL,DAN,DANG,DAR'


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

const options2 = {
  method: 'GET',
  url: 'https://mboum-finance.p.rapidapi.com/qu/quote',
  params: {
    symbol: `${secondSetSP200}`
  },
  headers: {
    'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
  }
};

const options3 = {
  method: 'GET',
  url: 'https://mboum-finance.p.rapidapi.com/qu/quote',
  params: {
    symbol: `${thirdSet}`
  },
  headers: {
    'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	//console.log(response.data);
  for(let i = 0; i < response.data.length; i++) {
    let stock = response.data[i]
    await Stock.create({ currentPrice: `${stock.ask}` , ticker: `${stock.symbol}`, name: `${stock.shortName}` })
  }
} catch (error) {
	console.error(error);
}

try {
	const response = await axios.request(options2);
	//console.log(response.data);
  for(let i = 0; i < response.data.length; i++) {
    let stock = response.data[i]
    await Stock.create({ currentPrice: `${stock.ask}` , ticker: `${stock.symbol}`, name: `${stock.shortName}` })
  }
} catch (error) {
	console.error(error);
}

try {
	const response = await axios.request(options3);
	//console.log(response.data);
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
  

  // await Friend.create({ friendingId: moe.id, frienderId: lucy.id });
  // await Friend.create({ friendingId: larry.id, frienderId: moe.id });

  await Assessment.create({score: 25, userId: moe.id});

  // const friends = await User.findByPk(moe.id, {
  //   attributes: ['username'],
  //   include: [{
  //     model: User,
  //     as: 'friender',
  //     attributes: ['username']
  //   },
  //   {
  //     model: User,
  //     as: 'friending',
  //     attributes: ['username']
  //   }]
  // });

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
  Friend,
  Hype
};
