'use strict'

const m = require('mithril')

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
  submit
}
