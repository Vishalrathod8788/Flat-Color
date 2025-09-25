import Ripples from "react-ripples";

export const Card = ({ color, onCopy }) => {
  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(color);
    onCopy(color);
  };

  return (
    <Ripples className="">
      <div
        role="button"
        tabIndex="0"
        onClick={handleCopy}
        className="w-80 md:w-48 h-32 m-4 rounded-lg cursor-pointer shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: color }}
      ></div>
    </Ripples>
  );
};
