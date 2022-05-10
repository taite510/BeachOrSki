const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 3000;
const router = require('./router.js');
const morgan = require('morgan');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);
app.listen(port, () => { console.log(`listening on port ${port}`) });