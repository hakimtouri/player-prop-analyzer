import { useState, useEffect } from "react";

export default function AltLineSlider({ min, max, step, initialValue, onChange }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <label className="text-gray-200 font-medium">
        Line: <span className="text-blue-400">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-64 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-500 to-green-400"
      />
    </div>
  );
}
