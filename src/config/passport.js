import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import User from "../models/User.js";

import env from "dotenv";
env.config();

console.log("CLIENT ID:", process.env.DISCORD_CLIENT_ID);

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ discordId: profile.id });

        if (!user) {
          user = await User.create({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
          });
        }

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
