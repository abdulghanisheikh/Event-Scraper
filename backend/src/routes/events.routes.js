import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {getEvents} from '../controllers/event.controller.js';
import { runScraping } from '../app.js';

const router = express.Router();

// Get all events (requires authentication)
router.get('/',verifyToken,runScraping,getEvents);

export default router;