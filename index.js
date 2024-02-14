const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const appModule = require('./routes/app-module');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/api/', appModule);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});