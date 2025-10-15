import express from 'express';
import { getPropAnalysis } from '../controllers/propController.js';

const router = express.Router();

// GET /api/props/:playerId/analysis?line=81&filter=L5
router.get('/:playerId/analysis', getPropAnalysis);

export default router;