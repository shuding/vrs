/**
 * Created by shu on 14/6/2017.
 */

import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

const Mixed = mongoose.Schema.Types.Mixed

const Order = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 1
  },
  cost: {
    type: Number,
    required: true
  },
  extra: {
    type: Mixed,
    default: {}
  }
})

Order.plugin(findOrCreate)

export default mongoose.model('VRS-Order', Order)
