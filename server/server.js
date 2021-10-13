const express = require('express');
const app = express();
const crawler = require('./Router/crawler');

app.use('/api',crawler);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));