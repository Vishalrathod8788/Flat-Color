import { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fade } from "react-awesome-reveal";

export const Home = () => {
  const [cards, setCards] = useState([]);
  const [toastStatus, setToastStatus] = useState(false);
  const [copiedColor, setCopiedColor] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toastTimer = useRef(null);

  const handleCopy = (color) => {
    setCopiedColor(color);
    setToastStatus(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastStatus(false), 1500);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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
    <div
      className={`w-full min-h-screen text-center relative transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <h1
        className={`py-4 text-2xl font-bold transition-colors ${
          theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-600 text-white"
        }`}
      >
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

      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors absolute right-3 top-3 ${
          theme === "dark" ? " text-white" : " text-white"
        }`}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* InfiniteScroll Container */}
      <InfiniteScroll
        dataLength={cards.length} // total items so far
        next={() => fetch(10)} // generate 10 more on scroll
        hasMore={true} // always load more
        loader={
          <h4
            className={`mt-4 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            Loading more colors...
          </h4>
        }
      >
        <div className="flex flex-wrap justify-center mt-6 mx-4 gap-2 p-4">
          {cards.map((color, index) => (
            <Card key={index} color={color} onCopy={handleCopy} theme={theme} />
          ))}
        </div>
      </InfiniteScroll>

      {/* Toast Notification - Fixed at top level */}
      {toastStatus && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
          <Fade triggerOnce>
            <div
              className={`p-[30px] font-bold fixed top-[20px] right-[20px] w-[280px] rounded-[5px] pointer-events-auto transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-2 border-white"
                  : "bg-white text-black border border-gray-800"
              }`}
            >
              {copiedColor} <h3 className="inline">Copied!</h3>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
};
