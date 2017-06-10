/**
 * Created by shu on 6/5/2017.
 */

// utils
import config from 'config'
import path from 'path'

// server
import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'

// middlewares
import cookieParser from 'cookie-parser'
import serveFavicon from 'serve-favicon'
import expressSession from 'express-session'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import {OAuthStrategy as GoogleStrategy} from 'passport-google-oauth'
import {Strategy as TwitterStrategy} from 'passport-twitter'

// service related
import schema from './api'
import User from './model/User'

export default () => {
  const app = express()
  const server = http.createServer(app)
  const io = socketio(server, config.socketio)

  mongoose.connect(config.db)

  // tools
  app.use(cookieParser())
  app.use(expressSession(config.session))
  app.use(compression())
  app.use(cors({origin: ['*.shud.in', 'localhost:*', '127.0.0.1:*']}))
  app.use(serveFavicon(path.join(__dirname, '..', 'public', 'static', 'images', 'favicon.ico')))

  // GraphQL
  app.use('/api', expressGraphQL({
    schema,
    // turn on graphiql for debugging if under dev mode
    graphiql: global.__is_dev
  }))

  // authenticate
  passport.use(new TwitterStrategy({
      consumerKey: config.TWITTER_CONSUMER_KEY,
      consumerSecret: config.TWITTER_CONSUMER_SECRET,
      callbackURL: config.domain + "/auth/twitter/callback"
    },
    (token, tokenSecret, profile, done) => {
      console.log(token, tokenSecret, profile)
      User.findOrCreate({
        profile
      }, function(err, user) {
        if (err) {
          return done(err)
        }
        done(null, user)
      })
    }
  ))
  app.get('/auth/twitter', passport.authenticate('twitter'))
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  server.listen(config.port)

  return { app, server, io }
}
