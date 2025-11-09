import { useState } from "react";

export default function Cookies() {
  // Open - Close Menu Design with state
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <nav className="cokkiesCard">
      <section className="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
        <div className="flex items-center gap-x-4">
          <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
            {/* Maglo icon */}
            <img src="/assets/favicon.png"></img>
          </span>

           {/* Cookies Card Text/label */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to ensure that we give you the best experience on our
            application.{" "}
             {/* Maglo Cokkies Read More Page routing with basic routing*/}
            <a href="#" className="text-blue-500 hover:underline">
              Maglo Finance Application
            </a>
            .
          </p>
        </div>
         {/* Maglo Cokkies Close Button*/}
        <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
          <button
            onClick={handleAccept}
            className="text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
          >
            Accept All Cookies
          </button>
        </div>
      </section>
    </nav>
  );
}


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/