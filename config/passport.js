// config/passport.js
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

// código anterior omitido
var mongoose = require('mongoose');

module.exports = function () {
    var Usuario = mongoose.model('Usuario');
    // código anterior omitido
    passport.use(new GitHubStrategy({
        clientID: 'SEU CLIENT ID',
        clientSecret: 'SEU CLIENT PASSWORD',
        callbackURL: 'SUA REDIRECT_URI'
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
}; 