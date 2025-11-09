import apiClient from './apiClient';

export const getRecentTransactions = async () => {
  const response = await apiClient.get('/financial/transactions/recent');
  return response.data;
};
