const express = require('express');
const app = express();

const basicRoutes = require('./routes/router');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/hospital', basicRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
