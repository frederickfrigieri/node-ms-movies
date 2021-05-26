const test = require('tape');
const supertest = require('supertest');
const movies = require('./movies');
const server = require('../server/server');
const repository = require('../repository/repository');

function runTests() {
    var app = null;
    server.start(movies, repository, (err, app) => {
        var id = null;
        test('GET /movies', (t) => {
            supertest(app)
                .get('/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0) id = res.body[0]._id;
                    t.error(err, 'Sem Erros');
                    t.assert(res.body && res.body.length > 0, 'Todos filmes foram retornados');
                    t.end();
                });
        });

        test('GET /movies/:id', (t) => {
            if (!id) {
                t.assert(false, 'Filme pelo Id retornado');
                t.end();
                return;
            }

            supertest(app)
                .get('/movies/' + id)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    t.error(err, 'Sem erro');
                    t.assert(res.body, 'Filmes retornado pelo Id');
                    t.end();
                })
        });

        server.stop();
    });

}

module.exports = { runTests }