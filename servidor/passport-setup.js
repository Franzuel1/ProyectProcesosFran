const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const LocalStrategy = require('passport-local').Strategy;
//const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
//local
//
passport.use(new GoogleStrategy({
    clientID: "162867793-krmekskd7524g7fph19coq973942ls8d.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
},
/*
//desplegable
passport.use(new GoogleStrategy({
    clientID: "162867793-5a0fuv1dntbo103eaer1car72h9ssrjd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://proyectprocesosfran-dt4p6agska-ew.a.run.app/google/callback"
},
*/
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
/*
passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" },
        function (email, password, done) {
            sistema.loginUsuario({ "email": email, "password": password }, function (user) {
                if (user.email != -1) {
                    return done(null, user);
                }
                else {
                    return done(-1);
                }
            })
        }
    ));
*/
