const express = require('express');
const bodyParser = require('body-parser');
const conferences = require('./routes/conferences');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Welcome to our FinTech Conference'));
app.use('/conferences', conferences);

module.exports = {
  run: () => app.listen(port, () => console.log(`FinTech Conference listening on port ${port}!`)),
  app
};
