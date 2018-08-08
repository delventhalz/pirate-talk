'use strict'

const { TransactionProcessor } = require('sawtooth-sdk/processor')
const PirateHandler = require('./handler')

const VALIDATOR_URL = process.env.VALIDATOR_URL || 'tcp://localhost:4004'

const tp = new TransactionProcessor(VALIDATOR_URL)
const handler = new PirateHandler()
tp.addHandler(handler)

console.log('YARRRR READY TO TALK LIKE A PIRATE!!!')
tp.start()
