import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ error: 'Failed to fetch player' });
  }
};

export const getPlayerStats = async (req, res) => {
  try {
    const { id } = req.params;

    const games = await prisma.game.findMany({
      where: { playerId: id },
      include: { stats: true },
      orderBy: { gameDate: 'desc' },
    });

    res.json({ playerId: id, games });
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
};