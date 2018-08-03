const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/db');

const app = express();
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// serves static files
app.use(express.static(path.join(__dirname, '../client/dist/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/songs/:songId', (req, res) => {
  const songId = req.params.songId;
  console.log('server', songId);
  db.getSong(songId,(error, data) => {
    if (error) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

const PORT = 7888;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
