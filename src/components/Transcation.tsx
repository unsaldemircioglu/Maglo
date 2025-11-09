{
  /* React Properties */
}
import React, { useEffect } from "react";
import { useRecentTransactions } from "../hooks/useRecentTransactions";
{
  /* Type */
}
import type { Transaction as TransactionType } from "../types/Transaction";
{
  /* Libaries */
}
import { toast } from "react-hot-toast";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Transaction: React.FC = () => {
  const { data, isLoading, error } = useRecentTransactions();
  {
    /* Error handling */
  }
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        duration: 4000,
      });
    }
  }, [error]);

  // Currency formatter
  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
      }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-md mt-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">Recent Transactions</h1>
        <a href="#" className="text-green-500 flex items-center text-base">
          View All <MdOutlineArrowForwardIos className="ml-1 mt-[2px]" />
        </a>
      </div>
      {/* Title */}
      <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-gray-500 mb-2">
        <span>NAME/BUSINESS</span>
        <span>TYPE</span>
        <span>AMOUNT</span>
        <span>DATE</span>
      </div>
      {/* Loading */}
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {/* Error */}
      {error && (
        <p className="text-red-500 mt-2">
          With user account doesn't find in server: {error.message}
        </p>
      )}

      {!isLoading && !error && data?.length === 0 && (
        <p className="text-gray-500">Hiç işlem bulunamadı.</p>
      )}

      {!isLoading && !error && data?.length > 0 && (
        <ul className="space-y-4">
          {/* My Component */}
          {data.map((tx: TransactionType) => (
            <li
              key={tx.id}
              className="border-b pb-2 grid grid-cols-4 gap-4 text-sm"
            >
              <div className="font-semibold">
                {tx.name ?? tx.businessName ?? "Bilinmeyen"}
              </div>
              <div className="text-gray-600">{tx.description}</div>
              <div className="text-gray-600">
                {formatCurrency(tx.amount, tx.currency)}
              </div>
              <div className="text-gray-600">
                {/* {new Date(tx.date).toLocaleDateString('tr-TR')} */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transaction;



/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/