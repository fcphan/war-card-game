const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (e) => console.error(e))
db.once('open', () => console.log('Connected to database.'))

const PORT = 5000 || process.env.PORT
const app = express();

const ads = [
  {title: 'Hello, world (again)!'}
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const scoresRouter = require('./routes/scoreboard')
app.use('/scoreboard', scoresRouter)

app.get('/', (req, res) => {
  res.send(ads);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});