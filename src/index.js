const express = require('express');

const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('Welcome to our FinTech Conference'));


module.exports = {
  run: () => app.listen(port, () => console.log(`FinTech Conference listening on port ${port}!`)),
  app
};
