/**
 * Local Data Service (No backend or MySQL connections)
 * Serves predefined data from src/data/mockData.js
 */
import {
  mockStocks,
  getInitialPortfolios,
  mockTransactions,
  mockUsers,
  mockProfile
} from '../data/mockData';

export function getStocks() {
  return { data: mockStocks, isLive: false };
}

export function getPortfolios() {
  return { data: getInitialPortfolios(), isLive: false };
}

export function getTransactions() {
  return { data: mockTransactions, isLive: false };
}

export function getUserProfile() {
  return {
    data: {
      user: mockUsers[0],
      profile: mockProfile
    },
    isLive: false
  };
}
