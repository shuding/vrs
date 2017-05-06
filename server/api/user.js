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

// THE USER SCHEMA
const ID_DESC = 'unique id of an user, using MongoDB\'s default ObjectID'

const type = new GraphQLObjectType({
  name: 'User',
  description: 'user type',
  fields: () => ({
    id: {
      description: ID_DESC,
      type: new GraphQLNonNull(GraphQLString)
    }
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
    // TODO: connect to real DB
    resolve({
      id
    })
  })
}

export default { type, query }
