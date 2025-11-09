import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Transaction } from '../types/Transaction';

export function useRecentTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<Transaction[]>('https://case.nodelabs.dev/api/financial/transactions/recent')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/