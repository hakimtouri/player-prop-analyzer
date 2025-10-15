import { useState, useEffect } from "react";
import PlayerHeader from "./components/PlayerHeader";
import PropAnalysis from "./components/PropAnalysis";

export default function App() {
  const [playerId] = useState("3c93c71b-6841-4784-8f00-723123167a74");

  const player = {
    name: "Jaxon Smith-Njigba",
    position: "WR",
    teamLeft: "SEA",
    teamRight: "HOU",
    matchup: "HOU @ SEA",
    teamLogoLeft: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
    teamLogoRight: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <PlayerHeader player={player} />
        <PropAnalysis playerId={playerId} />
      </div>
    </div>
  );
}