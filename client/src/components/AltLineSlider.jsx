import React from "react";

export default function AltLineSlider({ altLine, setAltLine, min = 50, max = 140, step = 0.5 }) {
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setAltLine(newValue);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Alt Line:
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={altLine}
          onChange={handleChange}
          className="w-48 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #000 0%, #000 ${((altLine - min) / (max - min)) * 100}%, #e5e7eb ${((altLine - min) / (max - min)) * 100}%, #e5e7eb 100%)`
          }}
        />
        <span className="text-sm font-semibold text-gray-900 w-12 text-right">
          {altLine.toFixed(1)}
        </span>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}