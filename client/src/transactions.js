'use strict'

const {
  Transaction,
  TransactionHeader,
  Batch,
  BatchHeader,
  BatchList
} = require('sawtooth-sdk/protobuf')
const { createHash } = require('crypto')
const { getPublicKey, sign } = require('./signing.js')
const { encode } = require('./encoding.js')

const FAMILY_NAME = 'cryptomoji'
const FAMILY_VERSION = '0.1'
const NAMESPACE = '5f4d76'

// Takes a string and returns a hex-string SHA-512 hash
const hash = str => createHash('sha512').update(str).digest('hex')

// Returns a random 1-12 character string
const getNonce = () => (Math.random() * 10 ** 18).toString(36)

// Creates a signed transaction from a private key and payload
const createTransaction = (privateKey, payload) => {
  const publicKey = getPublicKey(privateKey)
  const encodedPayload = encode(payload)

  const header = TransactionHeader.encode({
    signerPublicKey: publicKey,
    batcherPublicKey: publicKey,
    familyName: FAMILY_NAME,
    familyVersion: FAMILY_VERSION,
    inputs: [ NAMESPACE ],
    outputs: [ NAMESPACE ],
    nonce: getNonce(),
    payloadSha512: hash(encodedPayload)
  }).finish()

  return Transaction.create({
    header,
    headerSignature: sign(privateKey, header),
    payload: encodedPayload
  })
}

// Creates a signed batch from a private key and transactions
const createBatch = (privateKey, transactions) => {
  const publicKey = getPublicKey(privateKey)
  if (!Array.isArray(transactions)) {
    transactions = [ transactions ]
  }

  const header = BatchHeader.encode({
    signerPublicKey: publicKey,
    transactionIds: transactions.map(t => t.headerSignature)
  }).finish()

  return Batch.create({
    header,
    headerSignature: sign(privateKey, header),
    transactions
  })
}

// Encodes one or more batches in a batch list
const encodeBatches = batches => {
  if (!Array.isArray(batches)) {
    batches = [ batches ]
  }
  const batchList = BatchList.encode({ batches }).finish()

  // Axios will mishandle a Uint8Array constructed with a large ArrayBuffer.
  // The easiest workaround is to take a slice of the array.
  return batchList.slice()
}

// Takes a private key and one or more payloads and returns a batch list
const encodeAll = (privateKey, payloads) => {
  if (!Array.isArray(payloads)) {
    payloads = [ payloads ]
  }

  const transactions = payloads.map(p => createTransaction(privateKey, p))
  const batch = createBatch(privateKey, transactions)

  return encodeBatches(batch)
}

module.exports = {
  createTransaction,
  createBatch,
  encodeBatches,
  encodeAll
}
