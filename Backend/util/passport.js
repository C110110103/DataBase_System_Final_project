let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const userModels = require("../models/userModels");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      // console.log("opts", opts);
      // console.log("jwt_payload", jwt_payload);
      // console.log("jwt_payload._id", jwt_payload._id);
      try {
        let foundUser = await userModels.findId(jwt_payload._id);
        if (foundUser.length > 0) {
          return done(null, foundUser);
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
