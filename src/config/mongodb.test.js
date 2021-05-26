const test = require('tape');
const mongodb = require('./mongodb');

function runTests() {

    test('MongDB Connection', (t) => {
        mongodb.connect((err, conn) => {
            t.assert(conn, 'Conexao estabelecida');
            t.end();
        })
    })

    test('MongoDB Disconnect', (t) => {
        t.assert(mongodb.disconnect(), 'Desconctado');
        t.end();
    })
}

module.exports = { runTests }