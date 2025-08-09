const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rate Limiting (1 request per minute per IP)
const claimLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1,
  message: { error: 'Too many requests. Please wait before claiming again.' }
});

// Routes
app.get('/', (req, res) => {
  res.send('✅ Faucet backend is running!');
});

app.post('/api/claim', claimLimiter, (req, res) => {
  const { wallet } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: 'Wallet address is required.' });
  }

  // TODO: Add CAPTCHA verification here
  // TODO: Add crypto payout logic here

  res.json({
    success: true,
    message: `Tokens would be sent to wallet: ${wallet}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});