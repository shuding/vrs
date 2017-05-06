/**
 * Created by shu on 5/5/2017.
 */

global.__is_dev = process.env.NODE_ENV === 'development'
global.__is_prod = process.env.NODE_ENV === 'production'

import debug from 'debug'
const log = debug('vrs')
log(`Running on ${process.env.NODE_ENV} mode`)

import bootstrap from './server'

bootstrap()
