'use strict'

const {
  Transaction,
  TransactionHeader,
  Batch,
  BatchHeader,
  BatchList
} = require('sawtooth-sdk/protobuf')
const { randomBytes, createHash } = require('crypto')
const { getPublicKey, sign } = require('./signing.js')

// Returns a hex SHA-512 hash of a string or Buffer
const sha512 = msg => createHash('sha512').update(msg).digest('hex')

// Creates a signed transaction from a private key and a message
const createTransaction = (privateKey, message) => {
  const publicKey = getPublicKey(privateKey)
  const payload = Buffer.from(message)

  const header = TransactionHeader.encode({
    signerPublicKey: publicKey,
    batcherPublicKey: publicKey,
    familyName: 'pirate-talk',
    familyVersion: '0.0',
    inputs: [ 'aaaaaa' ],
    outputs: [ 'aaaaaa' ],
    nonce: randomBytes(12).toString('base64'),
    payloadSha512: sha512(payload)
  }).finish()
  const headerSignature = sign(privateKey, header)

  return Transaction.create({ header, headerSignature, payload })
}

// Creates a signed batch from a private key and an array of transactions
const createBatch = (privateKey, transactions) => {
  const publicKey = getPublicKey(privateKey)
  const header = BatchHeader.encode({
    signerPublicKey: publicKey,
    transactionIds: transactions.map(t => t.headerSignature)
  }).finish()
  const headerSignature = sign(privateKey, header)

  return Batch.create({ header, headerSignature, transactions })
}

// Encodes one or more batches in a batch list
const encodeBatches = batches => {
  return BatchList.encode({ batches }).finish()
}

// Takes a private key and a message and returns an encoded batch list
const encodeTransaction = (privateKey, message) => {
  const transaction = createTransaction(privateKey, message)
  const batch = createBatch(privateKey, [transaction])
  return encodeBatches([batch])
}

module.exports = {
  encodeTransaction
}
