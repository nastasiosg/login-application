const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// PORT set up
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:8080"],
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(compression());
// Routes
const router = require('./routes/router.js');
app.use('/', router);

// Start server on port 3000
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
