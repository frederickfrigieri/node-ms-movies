module.exports = (app, repository) => {

    app.get('/movies', (req, res, next) => {
        repository.getAllMovies((err, movies) => {
            if (err) return next(err);
            res.json(movies);
        });
    });

    app.get('/movies/:id', (req, res, next) => {
        repository.getMoviesById(req.params.id, (err, movie) => {
            if (err) return next(err);
            res.json(movie);
        });
    });

}