const express = require('express');
const app = express();

const basicRoutes = require('./routes/router');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/hospital', basicRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
