/**
 * Created by shu on 14/6/2017.
 */

import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

const Mixed = mongoose.Schema.Types.Mixed

const Model = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  extra: {
    type: Mixed,
    default: {}
  },
  comments: {
    type: [{
      user: String,
      content: String,
      date: Date
    }],
    default: []
  }
})

Model.plugin(findOrCreate)

export default mongoose.model('VRS-Model', Model)
