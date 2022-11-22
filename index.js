const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static('html'));

let routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

routes(app);

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })