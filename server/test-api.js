import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAPI() {
  // Get the first player
  const player = await prisma.player.findFirst();
  
  if (!player) {
    console.log('❌ No player found in database');
    return;
  }

  console.log('✅ Found player:', player.name);
  console.log('📋 Player ID:', player.id);
  
  const playerId = player.id;
  
  // Test URLs
  console.log('\n🔗 Test these URLs:\n');
  console.log(`Health Check:`);
  console.log(`http://localhost:5001/api/health\n`);
  
  console.log(`Get Player Stats:`);
  console.log(`http://localhost:5001/api/players/${playerId}/stats\n`);
  
  console.log(`Prop Analysis (line 81):`);
  console.log(`http://localhost:5001/api/props/${playerId}/analysis?line=81\n`);
  
  console.log(`Prop Analysis with L5 filter:`);
  console.log(`http://localhost:5001/api/props/${playerId}/analysis?line=81&filter=L5\n`);
  
  // Actually test the endpoint
  console.log('🧪 Testing prop analysis endpoint...\n');
  
  try {
    const response = await fetch(`http://localhost:5001/api/props/${playerId}/analysis?line=81`);
    const data = await response.json();
    
    console.log('✅ Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('Make sure your server is running: npm run dev');
  }
  
  await prisma.$disconnect();
}

testAPI();