const test = require('tape');
const server = require('./server');

function apiMock(app, repo) {
    console.log('faz nada');
}

function runTests() {
    test('Iniciando o Servidor', (t) => {
        server.start(apiMock, null, (err, srv) => {
            t.assert(!err && srv, 'Servidor iniciado');
            t.end();
        });
    });

    test('Parando o servidor', (t) => {
        t.assert(server.stop(), 'Servidor parado');
        t.end();
    });
}

module.exports = { runTests }