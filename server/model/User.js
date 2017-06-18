/**
 * Created by shu on 11/6/2017.
 */

import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'

// const Mixed = mongoose.Schema.Types.Mixed

const User = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  }
})

User.plugin(findOrCreate)

export default mongoose.model('VRS-User', User)
