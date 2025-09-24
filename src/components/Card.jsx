import { useState } from "react";
import Ripples from "react-ripples";
import { Fade } from "react-awesome-reveal";

export const Card = ({ color }) => {
  const [toastStatus, setToastStatus] = useState(false);

  let toastTimer;

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(color);
    setToastStatus(true);

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToastStatus(false), 1000);
  };

  return (
    <Ripples>
      {/* Toast Notification */}
      {toastStatus && (
        <Fade className="z-[100]">
          <div className="p-[30px] font-bold fixed top-[20px] right-[20px] bg-[snow] text-[#212121] w-[300px] rounded-[5px] ">
            <h3>{color}Copied!</h3>
          </div>
        </Fade>
      )}

      {/* Color Card */}
      <div
        role="button"
        tabIndex="0"
        onClick={handleCopy}
        className="w-48 h-32 m-4 rounded-lg cursor-pointer shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: color }}
      ></div>
    </Ripples>
  );
};
