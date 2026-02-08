export interface MarketData {
  pair: string;
  name: string;
  price: number;
  change24h: number;
}

export const sampleMarketData: MarketData[] = [
  {
    pair: 'SOL/USDT',
    name: 'Solana',
    price: 142.35,
    change24h: 5.67,
  },
  {
    pair: 'BTC/USDT',
    name: 'Bitcoin',
    price: 67234.12,
    change24h: 2.34,
  },
  {
    pair: 'ETH/USDT',
    name: 'Ethereum',
    price: 3456.78,
    change24h: -1.23,
  },
  {
    pair: 'BNB/USDT',
    name: 'Binance Coin',
    price: 412.56,
    change24h: 3.45,
  },
];

export const marketOverview = {
  trendPercentage: '+12.5',
  longShortRatio: '2.3:1',
  longPercentage: 69.7,
};
