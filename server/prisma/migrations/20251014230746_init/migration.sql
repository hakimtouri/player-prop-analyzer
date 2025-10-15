-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "opponent" TEXT NOT NULL,
    "isHome" BOOLEAN NOT NULL DEFAULT true,
    "gameDate" TIMESTAMP(3) NOT NULL,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStat" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "receivingYards" INTEGER NOT NULL DEFAULT 0,
    "receptions" INTEGER NOT NULL DEFAULT 0,
    "receivingTDs" INTEGER NOT NULL DEFAULT 0,
    "rushingYards" INTEGER NOT NULL DEFAULT 0,
    "rushingTDs" INTEGER NOT NULL DEFAULT 0,
    "targets" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropLine" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "propType" TEXT NOT NULL,
    "line" DOUBLE PRECISION NOT NULL,
    "overOdds" INTEGER NOT NULL,
    "underOdds" INTEGER NOT NULL,
    "sportsbook" TEXT NOT NULL,
    "gameDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Player_team_idx" ON "Player"("team");

-- CreateIndex
CREATE INDEX "Player_position_idx" ON "Player"("position");

-- CreateIndex
CREATE INDEX "Game_playerId_idx" ON "Game"("playerId");

-- CreateIndex
CREATE INDEX "Game_season_idx" ON "Game"("season");

-- CreateIndex
CREATE INDEX "Game_gameDate_idx" ON "Game"("gameDate");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStat_gameId_key" ON "PlayerStat"("gameId");

-- CreateIndex
CREATE INDEX "PlayerStat_gameId_idx" ON "PlayerStat"("gameId");

-- CreateIndex
CREATE INDEX "PropLine_playerId_idx" ON "PropLine"("playerId");

-- CreateIndex
CREATE INDEX "PropLine_propType_idx" ON "PropLine"("propType");

-- CreateIndex
CREATE INDEX "PropLine_gameDate_idx" ON "PropLine"("gameDate");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStat" ADD CONSTRAINT "PlayerStat_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropLine" ADD CONSTRAINT "PropLine_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
