'use strict'

const secp256k1 = require('secp256k1')
const { randomBytes, createHash } = require('crypto')

// Returns a Buffer SHA-256 hash of a string or Buffer
const sha256 = msg => createHash('sha256').update(msg).digest()

// Converts a hex string to a Buffer
const toBytes = hex => Buffer.from(hex, 'hex')

// Create a new hex private key
const createPrivateKey = () => {
  let privateKey = null
  do {
    privateKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privateKey))

  return privateKey.toString('hex')
}

// Get the hex public pair of a private key
const getPublicKey = privateKey => {
  return secp256k1.publicKeyCreate(toBytes(privateKey)).toString('hex')
}

// Create a private/public key pair together in an object
const createKeys = () => {
  const privateKey = createPrivateKey()
  const publicKey = getPublicKey(privateKey)
  return { privateKey, publicKey }
}

// Create a hex signature from a private key and message
const sign = (privateKey, message) => {
  const { signature } = secp256k1.sign(sha256(message), toBytes(privateKey))
  return signature.toString('hex')
}

module.exports = {
  createPrivateKey,
  getPublicKey,
  createKeys,
  sign
}
