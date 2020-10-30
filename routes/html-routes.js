const mysql = require('mysql')

module.exports = (app, connection) => {
    app.get('/', (req, res) => {
        res.send("Hello")

    })
}