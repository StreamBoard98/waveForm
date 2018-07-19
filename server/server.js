const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


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

// app.get('/', (req, res) => {

// })
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
