import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPropAnalysis = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { line, filter } = req.query;

    if (!line) {
      return res.status(400).json({ error: 'Line parameter is required' });
    }

    const altLine = parseFloat(line);

    // Build where clause
    let whereClause = { playerId };
    
    // Fetch games based on filter
    let games;
    if (filter && filter.startsWith('L')) {
      // Last N games (L5, L10, L15)
      const lastN = parseInt(filter.substring(1));
      games = await prisma.game.findMany({
        where: whereClause,
        include: { stats: true },
        orderBy: { gameDate: 'desc' },
        take: lastN,
      });
    } else {
      // All games
      games = await prisma.game.findMany({
        where: whereClause,
        include: { stats: true },
        orderBy: { gameDate: 'desc' },
      });
    }

    // Format response
    const chartData = games.map((game) => ({
      opponent: game.opponent,
      yards: game.stats?.receivingYards || 0,
      date: game.gameDate,
    }));

    const overHits = chartData.filter((g) => g.yards > altLine).length;
    const totalGames = chartData.length;
    const overPercentage = totalGames > 0 ? (overHits / totalGames) * 100 : 0;

    res.json({
      altLine,
      overHits,
      totalGames,
      overPercentage: overPercentage.toFixed(1),
      games: chartData,
    });
  } catch (error) {
    console.error('Error in prop analysis:', error);
    res.status(500).json({ error: 'Failed to calculate prop analysis' });
  }
};