/**
 * Created by shu on 19/6/2017.
 */

import Promise from 'bluebird'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
} from 'graphql'

import Model from '../model/Model'

// THE USER SCHEMA
const ID_DESC = 'ID of an model, unique, using MongoDB\'s default ObjectID'
const NAME_DESC = 'name of a model, String'
const DESC_DESC = 'description of a model, String'
const TYPE_DESC = 'type of a model, String'
const PRICE_DESC = 'price of a model, Number'
const EXTRA_DESC = 'extra fields of a model, Mixed' // TODO
const COMMENTS_DESC = 'comments of a model, Array'

const type = new GraphQLObjectType({
  name: 'Model',
  description: 'model type',
  fields: () => ({
    _id: {
      description: ID_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      description: NAME_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    desc: {
      description: DESC_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    type: {
      description: TYPE_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
    price: {
      description: PRICE_DESC,
      type: new GraphQLNonNull(GraphQLFloat)
    },
    comments: {
      description: COMMENTS_DESC,
      type: new GraphQLList(new GraphQLObjectType({
        name: 'Comment',
        fields: {
          user: { type: new GraphQLNonNull(GraphQLString) },
          content: { type: GraphQLString },
          date: { type: GraphQLString }
        }
      }))
    }
  })
})

const query = {
  type,
  args: {
    _id: {
      description: ID_DESC,
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  resolve: (root, {_id}, req) => new Promise((resolve, reject) => {
    Model
      .findOne({_id})
      .then(model => resolve(model))
      .catch(err => reject(err))
  })
}

export default { type, query }
