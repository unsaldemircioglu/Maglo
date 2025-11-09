{
  /* React Propeties */
}
import React, { useEffect, useState } from "react";
{
  /* Components */
}
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/src/components/ui/skeleton";
{
  /* Type */
}
interface Transfer {
  id: string;
  name: string;
  image?: string;
  date: string;
  amount: number;
  currency: string;
  status: string;
}

function TransferLog() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Similation five second for User Experince
    setTimeout(() => {
      fetch("/userTransferData.json")
        .then((res) => res.json())
        .then((data) => {
          setTransfers(data.data.transfers);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Data Catch Error:", err);
          setLoading(false);
        });
    }, 5000); // 5 extra time
  }, []);

  return (
    <div className="mt-30 p-8">
      <div className="cardHeader flex gap-6 items-center mb-4">
        {/* Title */}
        <h1 className="font-bold text-2xl">Scheduled Transfers</h1>
        <a href="#" className="text-green-500 flex items-center text-xl ml-30">
          View All <MdOutlineArrowForwardIos className="ml-1 mt-[2px]" />
        </a>
      </div>
      {/* Loading */}
      <div className="p-5 space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
                <Skeleton className="h-4 w-[80px]" />
              </div>
            ))
          : transfers.map((transfer) => {
              const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                transfer.name
              )}&background=random&size=100`;
              return (
                <div key={transfer.id} className="p-3 w-full flex items-center">
                  <div className="mt-2">
                    <Avatar>
                      <AvatarImage src={transfer.image || fallbackImage} />
                      <AvatarFallback>
                        {transfer.name.split(" ")[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="ml-4">
                    <p className="text-lg font-medium">{transfer.name}</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {new Date(transfer.date).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="ml-auto">
                    <span className="font-extrabold text-gray-600 text-lg">
                      <span className="symbol">-</span>
                      {transfer.currency}
                      {Math.abs(transfer.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default TransferLog;



/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/