{
  /* React Properties */
}
import React, { useEffect, useState } from "react";
{
  /* Style */
}
import "../components/Styles/Dashboard_article.scss";
{
  /* Icons */
}
import { IoWalletOutline } from "react-icons/io5";
{
  /* Loading Screen  */
}
import { Skeleton } from "@/src/components/ui/skeleton";

{
  /* Variable */
}
interface CardData {
  label: string;
  value: string;
  color: string;
  bg: string;
  textColor: string;
}
{
  /* Card Properties */
}
const cards: CardData[] = [
  {
    label: "Total Balance",
    value: "$5240.21",
    color: "green",
    bg: "#363a3f",
    textColor: "#ffffff",
  },
  {
    label: "Total Spending",
    value: "$250.80",
    color: "black",
    bg: "#ffffff",
    textColor: "#000000",
  },
  {
    label: "Total Saved",
    value: "$550.25",
    color: "black",
    bg: "#ffffff",
    textColor: "#000000",
  },
];

{
  /* Main Function */
}
const DashboardArticle: React.FC = () => {
  {
    /* Loading state */
  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="article-dashboard">
      {/* Loading Skeloton */}
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card skeleton-card">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="flex flex-col gap-2 ml-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </div>
          ))
        : cards.map((card, index) => (
            <div
              key={index}
              className="card"
              style={{
                backgroundColor: card.bg,
                borderRadius: "12px",
                color: card.textColor,
              }}
            >
              {/* Wallet Icon */}
              <div className="card-icon">
                <IoWalletOutline color={card.color} size={24} />
              </div>
              {/* Card Text */}
              <div className="card-text">
                <p className="label" style={{ color: card.textColor }}>
                  {card.label}
                </p>
                <p className="value" style={{ color: card.textColor }}>
                  {card.value}
                </p>
              </div>
            </div>
          ))}
    </article>
  );
};

export default DashboardArticle;


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/