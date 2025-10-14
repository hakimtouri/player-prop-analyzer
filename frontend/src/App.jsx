import { useState } from "react";
import data from "./data/bijan_robinson.json";
import PlayerChart from "./components/PlayerChart";
import AltLineSlider from "./components/AltLineSlider";
import { calculateWinPercentage } from "./utils/winPercentageCalc";

export default function App() {
  const [altLine, setAltLine] = useState(80);
  const winPct = calculateWinPercentage(data, altLine);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-white">
      <PlayerChart data={data} altLine={altLine} />
      <AltLineSlider altLine={altLine} setAltLine={setAltLine} />
      <p className="mt-4 text-lg">
        Hit Rate: <span className="font-semibold text-blue-400">{winPct}%</span>
      </p>
    </div>
  );
}
