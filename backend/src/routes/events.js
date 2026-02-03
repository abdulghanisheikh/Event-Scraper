import express from 'express';
import { verifyToken } from './auth.js';
import eventModel from '../models/event.model.js';
import {getEvents,getEvent} from '../controllers/event.controller.js';

const router = express.Router();

// Get all events (requires authentication)
router.get('/',verifyToken,getEvents);

// Get single event by ID
router.get('/:id', verifyToken,getEvent);

export default router;