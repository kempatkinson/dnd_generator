const mysql = require('mysql')

var dwarf = {
    name: 'dwarf',
    xp: 100
}
module.exports = (app, connection) => {
    app.get('/api/monsters', (req, res) => {
        connection.query('SELECT * FROM monsters', (err, data) => {
            (err) ? res.send(err): console.log(res.json({ monsters: data }));
        })
    })

    app.post('/api/monsters', (req, res) => {

        connection.query("INSERT INTO monsters VALUES (?,?)", [dwarf.name, dwarf.xp], function(err, result) {
            if (err) throw err;
            if (result) res.send(result);

        });




    });
}