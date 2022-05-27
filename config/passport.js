// config/passport.js
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

// código anterior omitido
var mongoose = require('mongoose');

module.exports = function () {
    var Usuario = mongoose.model('Usuario');
    // código anterior omitido
    passport.use(new GitHubStrategy({
        clientID: 'bb85590c9141cec4cb9b',
        clientSecret: '8bbc4e2a028106dab363e982879a52b031e33007',
        callbackURL: 'https://dswa5-11-ac-pt3009688.herokuapp.com/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login": profile.username },
            { "nome": profile.username },
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));
    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
            .then(function (usuario) {
                done(null, usuario);
            });
    });
};