const conn = require('./conn');
const { UUID, UUIDV4, INTEGER, VIRTUAL } = conn.Sequelize;

const riskStratum = [
  {
    title: "Low Risk: Preservation of Capital and Wealth Preservation",
    description: "Seeking the preservation of capital and wealth preservation in trading stocks represents a low-risk approach. This strategy prioritizes protecting your investment capital and focuses on minimizing potential losses rather than pursuing aggressive returns. It typically involves investing in low-risk assets such as bonds, index funds, or blue-chip stocks with a long-term perspective. While the potential for significant gains may be limited, the emphasis is on preserving wealth and minimizing exposure to market volatility."
  },
  {
    title: "Moderately Low Risk: Dividend Income and Blue-Chip Stocks",
    description: "If your financial goal in trading stocks is to generate dividend income and invest in blue-chip stocks, it falls under the moderately low risk category. Blue-chip stocks are shares of well-established, financially stable companies that have a history of providing reliable dividends. This strategy aims to generate regular income while also benefiting from potential capital appreciation. While there is still market risk involved, the focus on stable companies and dividends helps reduce the overall risk."
  },
  {
    title: "Moderate Risk: Balanced Portfolio and Steady Returns",
    description: "Aiming for a balanced portfolio and steady returns in trading stocks involves a moderate level of risk. This approach typically focuses on diversifying your investments across different sectors and asset classes to mitigate risk. It prioritizes stability and consistent growth over chasing high returns, which helps reduce the impact of market downturns. However, there is still a level of risk associated with market fluctuations that can affect the performance of your portfolio."
  },
  {
    title: "Moderately High Risk: Aggressive Growth and Capital Appreciation",
    description: "Seeking aggressive growth and capital appreciation in trading stocks carries a moderately high level of risk. This strategy involves investing in high-growth stocks or sectors with the expectation of substantial returns over the long term. While it offers potential for significant gains, it also exposes your portfolio to market volatility and the risk of investing in individual companies that may underperform or fail."
  },
  {
    title: "High Risk: Speculative Trading for Short-Term Gains",
    description: "If your financial goal in trading stocks is to engage in speculative trading for short-term gains, it can be considered high risk. This approach typically involves frequent buying and selling of stocks based on market fluctuations, aiming to make quick profits. However, it also comes with a high potential for significant financial losses due to the inherent volatility of the stock market."
  }
];

const Assessment = conn.define('assessment', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  score: {
    type: INTEGER
  },
  riskProfile: {
    type: VIRTUAL,
    get(){
      if(this.score < 18) return riskStratum[0];
      if(this.score >= 18 && this.score < 26) return riskStratum[1];
      if(this.score >= 26 && this.score < 34) return riskStratum[2];
      if(this.score >= 34 && this.score < 42) return riskStratum[3];
      if(this.score >= 42) return riskStratum[4];
    }
  }
});

module.exports = Assessment;