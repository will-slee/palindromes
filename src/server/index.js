const express = require('express');
const path = require('path')

const routes = require('./routes');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../')));

app.use('/api', routes);

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'))
});

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
})
