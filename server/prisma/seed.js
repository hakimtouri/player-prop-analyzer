import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Jaxon Smith-Njigba
  const jsn = await prisma.player.create({
    data: {
      name: 'Jaxon Smith-Njigba',
      position: 'WR',
      team: 'SEA',
      active: true,
    },
  });

  console.log('✅ Created player:', jsn.name);

  // Create games with stats
  const gamesData = [
    { opponent: 'SF', recievingYards: 110, rushingYards: 16, receptions: 8, TDs: 1, date: '2024-09-08' },
    { opponent: '@PIT', recievingYards: 95, rushingYards: 24, receptions: 6, TDs: 0, date: '2024-09-15' },
    { opponent: 'NO', recievingYards: 100, rushingYards: 12, receptions: 7, TDs: 0, date: '2024-09-22' },
    { opponent: '@ARI', recievingYards: 70, rushingYards: 9, receptions: 4, TDs: 2, date: '2024-09-29' },
    { opponent: 'TB', recievingYards: 120, rushingYards: 2, receptions: 9, TDs: 1, date: '2024-10-06' },
    { opponent: '@JAC', recievingYards: 130, rushingYards: 29, receptions: 10, TDs: 0, date: '2024-10-13' },
  ];

  for (const [index, gameData] of gamesData.entries()) {
    await prisma.game.create({
      data: {
        playerId: jsn.id,
        opponent: gameData.opponent,
        isHome: !gameData.opponent.startsWith('@'),
        gameDate: new Date(gameData.date),
        season: 2024,
        week: index + 1,
        stats: {
          create: {
            receivingYards: gameData.recievingYards,
            receptions: gameData.receptions,
            receivingTDs: gameData.TDs,
            rushingYards: gameData.rushingYards,
            rushingTDs: 0,
            targets: gameData.receptions + 2,
          },
        },
      },
    });
    console.log(`✅ Created game ${index + 1}:`, gameData.opponent);
  }

  // Create prop line
  await prisma.propLine.create({
    data: {
      playerId: jsn.id,
      propType: 'receiving_yards',
      line: 81.0,
      overOdds: -115,
      underOdds: -105,
      sportsbook: 'Consensus',
      gameDate: new Date('2024-10-20'),
    },
  });

  console.log('✅ Created prop line');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });