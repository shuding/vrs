/**
 * Created by shu on 6/5/2017.
 */

import Promise from 'bluebird'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import User from '../model/User'

// THE USER SCHEMA
const ID_DESC = 'ID of an user, unique, using MongoDB\'s default ObjectID'
const NAME_DESC = 'username of an user, String'
const LOGIN_DESC = 'login name of an user, unique, String'
const AVATAR_DESC = 'avatar URL of an user, String'

const type = new GraphQLObjectType({
  name: 'User',
  description: 'user type',
  fields: () => ({
    id: {
      description: ID_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      description: NAME_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    login: {
      description: LOGIN_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    avatar: {
      description: AVATAR_DESC,
      type: GraphQLString
    },
  })
})

const query = {
  type,
  args: {
    id: {
      description: ID_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: (root, {id}, req) => new Promise((resolve, reject) => {
    User
      .findOne({id})
      .then(user => resolve(user))
      .catch(err => reject(err))
  })
}

export default { type, query }
