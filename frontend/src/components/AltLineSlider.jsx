export default function AltLineSlider({ altLine, setAltLine }) {
    return (
      <div className="flex flex-col items-center bg-gray-800 text-white rounded-2xl p-4 mt-6 shadow-md">
        <label className="mb-2 text-lg font-semibold">Alt Line: {altLine} yards</label>
        <input
          type="range"
          min="40"
          max="130"
          value={altLine}
          onChange={(e) => setAltLine(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
    );
  }
  