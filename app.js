//  Create express app
const express = require('express');
const path = require('path');
const app = express();
const parser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(parser.urlencoded({ extended: true }));

const port = 3000;

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Handle all other routes (404)
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => console.log(`Running on port: http://localhost:${port}`));
