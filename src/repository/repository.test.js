const test = require('tape');
const repository = require('./repository');

function runTests() {
    var id = null;

    test('Repositorio GetAllMovies', (t) => {
        repository.getAllMovies((err, movies) => {
            if (movies && movies.length > 0) id = movies[0]._id;

            t.assert(!err && movies && movies.length > 0, 'Movies retornados');
            t.end();

        })
    });

    test('Repositorio GetMoviesById', (t) => {
        if (!id) {
            t.assert(false, 'Movie by Id retornado');
            t.end();
        }
        repository.getMoviesById(id, (err, movie) => {
            t.assert(!err && movie, 'Movie retornado');
            t.end();
        });
    });

    // test('Repositorio GetMoviePremiers', (t) => {
    //     repository.getMoviePremiers((err, movies) => {
    //         t.assert(!err && movies && movies.length, 'Movie Premiers retornado');
    //         t.end();
    //     });
    // });

    test('Repository Desconectado', (t) => {
        t.assert(repository.disconnect(), 'Desconectado OK');
        t.end();
    });
}

module.exports = { runTests }