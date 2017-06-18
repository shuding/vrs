/**
 * Created by shu on 19/6/2017.
 */

import fs from 'fs'
import path from 'path'

import co from 'co'
import faker from 'faker'

import User from '../server/model/User'
import Model from '../server/model/Model'

function init() {
  console.log(`Running DB Boilerplater...`)

  return new Promise(resolve => {
    co(function *() {
      // boilerplate code below

      let adminUser = new User({
        id: 'admin',
        name: 'test',
        login: 'test',
        avatar: ''
      })

      yield adminUser.save()

      const MODEL_CNT = 16
      const TYPES = [0, 0, 0, 0, 1, 1, 0, 0, 1, 2, 1, 0, 0, 1, 1, 1]
      const TYPE_MAP = {0: 'character', 1: 'object', 2: 'other'}

      for (let i = 0; i < MODEL_CNT; ++i) {
        let model = new Model({
          name: faker.commerce.product(),
          desc: faker.commerce.productName(),
          type: TYPE_MAP[TYPES[i]],
          price: +faker.commerce.price(),
          extra: {},
          comments: []
        })

        yield model.save()
      }

      fs.writeFileSync(path.join(__dirname, '..', 'vrs.info'), `DB generated at ${new Date()}`)

      resolve()
    })

    // ======
  })
}

export default init
