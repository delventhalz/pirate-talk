'use strict'

const m = require('mithril')

// Transform a pirate address into a formatted UUID
const toUuid = address => {
  return [
    address.slice(-32, -24),
    address.slice(-24, -20),
    address.slice(-20, -16),
    address.slice(-16, -12),
    address.slice(-12)
  ].join('-')
}

// Fetch all pirate messages from the Sawtooth REST API
const fetch = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=aaaaaa'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      message: window.atob(data)
    }))
  })
}

// Submit binary data to the Sawtooth REST API
const submit = data => {
  return m.request({
    method: 'POST',
    url: '/api/batches',
    headers: { 'Content-Type': 'application/octet-stream' },
    // prevent Mithril from trying to JSON stringify the body
    serialize: x => x,
    data
  }).then(({ link }) => {
    return m.request({
      method: 'GET',
      url: link + '&wait'
    })
  })
}

module.exports = {
  fetch,
  submit
}
