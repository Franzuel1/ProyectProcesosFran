const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "162867793-0nrd5gs29ul5e56hhj110372mitk4s9t.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new
    LocalStrategy({ usernameField: "email", passwordField: "password" },
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
