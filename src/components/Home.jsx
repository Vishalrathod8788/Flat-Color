import { useState, useEffect } from "react";
import { Card } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fade } from "react-awesome-reveal";

export const Home = () => {
  const [cards, setCards] = useState([]);
  const [toastStatus, setToastStatus] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");

  let toastTimer;

  const handleCopy = (color) => {
    setCopiedColor(color);
    setToastStatus(true);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToastStatus(false), 1500);
  };

  // Function to generate multiple random colors
  const fetch = (count = 10) => {
    const newColors = Array.from(
      { length: count },
      () =>
        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`
    );
    setCards((prevCards) => [...prevCards, ...newColors]); // append
  };

  // Load initial batch of colors
  useEffect(() => {
    fetch(30); // load 30 colors initially
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-center relative dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <h1 className="bg-blue-600 text-white py-4 text-2xl font-bold">
        Flat Color
      </h1>

      {/* GitHub Logo */}
      <img
        onClick={() => {
          window.open("https://github.com/vishalrathod8788/Flat-Color");
        }}
        src="gitlogo.png"
        className="w-10 absolute left-3 top-3 rounded-full cursor-pointer"
      />

      {/* InfiniteScroll Container */}
      <InfiniteScroll
        dataLength={cards.length} // total items so far
        next={() => fetch(10)} // generate 10 more on scroll
        hasMore={true} // always load more
        loader={<h4 className="text-white mt-4">Loading more colors...</h4>}
        // scrollThreshold={0.9} // load when 90% scrolled
      >
        <div className="flex flex-wrap justify-center mt-6 mx-4 gap-2 p-4">
          {cards.map((color, index) => (
            <Card key={index} color={color} onCopy={handleCopy} />
          ))}
        </div>
      </InfiniteScroll>

      {/* Toast Notification - Fixed at top level */}
      {toastStatus && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
          <Fade>
            <div className="p-[30px] font-bold fixed top-[20px] right-[20px] bg-[snow] text-[#212121] w-[280px] rounded-[5px] pointer-events-auto">
              {copiedColor} <h3 className="inline">Copied!</h3>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};
