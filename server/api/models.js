/**
 * Created by shu on 20/6/2017.
 */

import Promise from 'bluebird'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} from 'graphql'

import model from './model'
import Model from '../model/Model'

// THE MODELS SCHEMA

const type = new GraphQLList(model.type)

const query = {
  type,
  args: {
    // no args
  },
  resolve: (root, {}, req) => new Promise((resolve, reject) => {
    Model
      .find()
      .then(models => resolve(models))
      .catch(err => reject(err))
  })
}

export default { type, query }
