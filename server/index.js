/**
 * Created by shu on 6/5/2017.
 */

// utils
import config from 'config'

// server
import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import expressGraphQL from 'express-graphql'

// middlewares
import cookieParser from 'cookie-parser'
import serveFavicon from 'serve-favicon'
import expressSession from 'express-session'
import compression from 'compression'

// service related
import schema from './api'

export default () => {
  const app = express()
  const server = http.createServer(app)
  const io = socketio(server, config.socketio)

  // tools
  app.use(cookieParser())
  app.use(expressSession(config.session))
  app.use(compression())

  // GraphQL
  app.use('/api', expressGraphQL({
    schema,
    // turn on graphiql for debugging if under dev mode
    graphiql: global.__is_dev
  }))

  server.listen(config.port)

  return { app, server, io }
}
