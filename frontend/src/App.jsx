import PlayerHeader from "./components/PlayerHeader";
import PropAnalysis from "./components/PropAnalysis";

export default function App() {
  const player = {
    name: "Jaxon Smith-Njigba",
    position: "WR",
    teamLeft: "SEA",
    teamRight: "HOU",
    matchup: "HOU @ SEA",
    teamLogoLeft: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
    teamLogoRight: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png",
  };

  const data = {
    consensusLine: "81.0 (O -115 / U -143)",
    games: [
      { opponent: "SF", yards: 110 },
      { opponent: "@PIT", yards: 95 },
      { opponent: "NO", yards: 100 },
      { opponent: "@ARI", yards: 70 },
      { opponent: "TB", yards: 120 },
      { opponent: "@JAC", yards: 130 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PlayerHeader player={player} />
      <PropAnalysis data={data} />
    </div>
  );
}
