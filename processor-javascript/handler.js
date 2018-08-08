'use strict'

const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions')

const FAMILY_NAME = 'pirate-talk'
const FAMILY_VERSION = '0.0'
const NAMESPACE = 'aaaaaa'

const decode = payload => {
  try {
    return payload.toString('utf8')
  } catch (err) {
    throw new InvalidTransaction(err)
  }
}

const piratify = msg => {
  const ars = 'r'.repeat(msg.length / 3)
  const exlcaims = '!'.repeat(msg.length / 5)
  return `yar${ars} ${msg}${exclaims}`.toUpperCase()
}

class PirateHandler extends TransactionHandler {
  constructor () {
    super(FAMILY_NAME, [ FAMILY_VERSION ], [ NAMESPACE ])
  }

  apply (txn, context) {
    const message = decode(txn.payload)
    const pirateMessage = piratify(message)

    console.log(pirateMessage)
    return Promise.resolve()
  }
}

module.exports = PirateHandler
