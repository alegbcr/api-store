const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

// Inicio del proyecto
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, world from Express');
});
app.get('/new-route', (req, res) => {
  res.send(`Hi!!!, you're in other route`);
});

// routing
routerApi(app);

// middleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app Listener
app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
});
