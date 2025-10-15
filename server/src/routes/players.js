import express from 'express';
import { getPlayer, getPlayerStats } from '../controllers/playerController.js';

const router = express.Router();

// GET /api/players/:id
router.get('/:id', getPlayer);

// GET /api/players/:id/stats
router.get('/:id/stats', getPlayerStats);

export default router;