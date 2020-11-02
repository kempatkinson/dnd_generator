const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models");

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});




const PORT = process.env.PORT || 3001;
require("./app/routes/monster.routes")(app);

app.listen(PORT, () => {
    console.log("App running on: " + PORT)
})