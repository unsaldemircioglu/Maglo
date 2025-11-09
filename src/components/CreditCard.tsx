 {/* Credit Card Components */}
import {
  CreditCard,
  CreditCardBack,
  CreditCardChip,
  CreditCardCvv,
  CreditCardExpiry,
  CreditCardFlipper,
  CreditCardFront,
  CreditCardLogo,
  CreditCardMagStripe,
  CreditCardName,
  CreditCardNumber,
  CreditCardServiceProvider,
} from "@/components/ui/shadcn-io/credit-card";
 {/* React Icon */}
import { LuNfc } from "react-icons/lu";
import { IoIosMore } from "react-icons/io";

{/* Credit Card Component */}
const MagloCard = () => {
  return (
    <div className="relative w-[350px] h-[240px]">
      <div className="flex">
        {/* Title Wallet Component */}
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Wallet
          </span>
        </h1>
         {/* Credit Card Title Icon*/}
        <span className="ml-50">
          <IoIosMore size={40} />
        </span>
      </div>
       {/* Credit Card Background Side */}
      <CreditCard>
        <CreditCardFlipper>
           {/* Credit Card Of Frontend Side */}
          <CreditCardFront className="bg-gradient-to-b
          r from-black via-[#2c2c2c] to-gray-700 text-white">
            {/* Credit Card Title */}
            <div className="absolute top-3 left-4 text-xl font-bold tracking-wide">
              Maglo. | <span className="font-light">Universal Bank</span>
            </div>
             {/* Logo */}
            <CreditCardLogo>
              <div className="text-gray-600 text-2xl font-bold p-5">
                <LuNfc size={30} /> {/* NFC Logo*/}
              </div>
            </CreditCardLogo>
             {/* Credit Card Chip */}
            <CreditCardChip />
            {/* Credit Card System */}
                   <CreditCardServiceProvider
            type="Mastercard"
            format="mono"
            className="bg-orange-400"
          />
             {/* Credit Card Owner */}
            <CreditCardName className="absolute bottom-3 left-4">
              Maglo Card
            </CreditCardName>
          </CreditCardFront>
           {/* Credit Card Number */}
          <CreditCardBack className="bg-[#1c1b1b] text-white">
            <CreditCardMagStripe />
            <CreditCardNumber className="absolute bottom-3 left-4">
              5495 7381 3759 2321
            </CreditCardNumber>
             {/* Credit Card Details */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 flex gap-4">
              <CreditCardExpiry>01/24</CreditCardExpiry>
              <CreditCardCvv>123</CreditCardCvv>
            </div>
          </CreditCardBack>
        </CreditCardFlipper>
      </CreditCard>

      {/* Transparant Card for bank account */}
      <CreditCard className="absolute top-30 left-5 w-80 h-50 z-10 pointer-events-none">
        <CreditCardFront className="bg-[rgba(60,60,60,0.6)] border border-white/30 text-white">
         {/* NFC Logo */}
          <CreditCardLogo>
            <div className="text-gray-500 text-xl font-semibold">
              {" "}
              <LuNfc size={30} /> {/* NFC Logo*/}
            </div>
          </CreditCardLogo>
          <CreditCardChip />
           {/* Credit Card Background system */}
            <CreditCardServiceProvider
              type="Visa"
              format="logo"
              className="brightness-0 invert"
            />
           {/* Credit Card Logo */}
          <CreditCardName className="absolute bottom-3 left-4">
            Maglo. <span className="font-light">Universal Bank</span>
          </CreditCardName>
        </CreditCardFront>
      </CreditCard>
    </div>
  );
};

export default MagloCard;



/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/