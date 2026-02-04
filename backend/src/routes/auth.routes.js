import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth Login
router.post('/google',async(req,res)=>{
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify the Google token
    const ticket=await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload=ticket.getPayload();
    const { sub: googleId, name, email, picture }=payload;

    // Generate JWT token without storing user in DB
    const jwtToken=jwt.sign(
      { googleId, email, name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: {
        googleId,
        name,
        email,
        picture
      }
    });
  } catch (error) {
    console.error('Auth error:', error.message);
    console.error('Full error:', error);
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
});

export default router;