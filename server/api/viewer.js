/**
 * Created by shu on 7/5/2017.
 */

import Promise from 'bluebird'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import user from './user'

// THE CURRENT USER SCHEMA

const query = {
  type: user.type,
  args: {
    // no args
  },
  resolve: (root, {}, req) => new Promise((resolve, reject) => {
    // TODO: connect to real DB
    console.log(req.session)
    let user = null
    try {
      user = req.session.passport.user
    } catch (err) {
      reject(err)
    }
    resolve(user)
  })
}

export default { type: user.type, query }
