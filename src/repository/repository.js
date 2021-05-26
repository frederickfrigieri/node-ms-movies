const conexao = require('../config/mongodb');

function getAllMovies(callback) {
    conexao.connect((err, db) => {
        db.collection("movies")
            .find()
            .toArray(callback);
    });
}

function getMoviesById(id, callback) {
    conexao.connect((err, db) => {
        db.collection("movies")
            .findOne({ _id: require('mongodb').ObjectId(id) }, callback);
    });
}

function getMoviePremiers(callback) {
    var monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0);
    monthAgo.setMilliseconds(0);

    conexao.connect((err, db) => {
        db.collection("movies")
            .find({ dataLancamento: monthAgo })
            .toArray(callback);
    });
}

function disconnect() {
    return conexao.disconnect();
}

module.exports = { getAllMovies, getMoviesById, getMoviePremiers, disconnect }