const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('./model/users');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID:'474627485073-2fs5tec2ubscudn71350m1dg29nfeaf6.apps.googleusercontent.com',
            clientSecret: 'qfvxwKWwHpbHKUIcGFoFw8Do',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback   : true
        },
  function(request, accessToken, refreshToken, profile, done) {
         UserModel.findOne({ profile_id: profile.id }).then(user => {
            if(user){
                 return done(user, {
                profile: profile,
                token: accessToken
            },null);
            } else{
                const newBook = new UserModel({
                profile_id : profile.id,
                name : profile.displayName,
                provider: "google",
                role : "user",
                auth_tocken : accessToken
                });
                newBook.save(function (err, newUsers) {
                    return done(newUsers, {
                profile: profile,
                token: accessToken
            },null);
                  if (err) return handleError(err);
                });
            }
             
         });
       
     
  }));
};


