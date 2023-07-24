// requirements 0.0
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');

// best port to use  :)
const PORT = process.env.PORT || 3001;

//establishing the app :o
const app = express();

// importing custom middleware ^-^
app.use(clog);

app.use(express.static('public'));
//middleware that parses json :0
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);



//get homepage -.-
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get notes.html ༼ ༎ຶ ᆺ ༎ຶ༽C
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//wildcard that sends back to the homepage, incase anyone gets the wrong url ٩(＾◡＾)۶
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listening to the best port (´◡`)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}  d(-_^)`)
);