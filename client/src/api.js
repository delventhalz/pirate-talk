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
      text: window.atob(data)
    }))
  })
}

// buy/sell crypto/ bond orders
// todo
const buysellbond = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d03'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const owner = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d06'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const bondtype = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d06'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const bonds = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d07'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const cryptopubkey = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d12'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const cryptotype = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d04'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const get_one_cryptotype = () => {
  return m.request({
    method: 'GET',
    data: uuid,
    url: '/api/state?address=b04d04'+ '00000000000000000000000000000000'+ uuid
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const orders = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d10'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const ownerbonds = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d08'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const ownercrypto = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d09'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
    }))
  })
}

// Fetch all pirate messages from the Sawtooth REST API
const clearer = () => {
  return m.request({
    method: 'GET',
    url: '/api/state?address=b04d11'
  }).then(({ data }) => {
    return data.map(({ address, data }) => ({
      id: toUuid(address),
      text: window.atob(data)
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
  })
}

// Subscribes to blockchain state changes, passing new messages to a callback
const subscribe = onReceive => {
  const url = `ws:${window.location.host}/api/subscriptions`
  const socket = new window.WebSocket(url)
  let isFirstMessage = true

  // Subscribe to state deltas
  socket.onopen = () => {
    socket.send(JSON.stringify({
      action: 'subscribe',
      address_prefixes: ['aaaaaa']
    }))
  }

  // Send new messages to callback as they are committed
  socket.onmessage = ({ data }) => {
    // The first message is already in state data, so we will throw it away
    if (isFirstMessage) {
      isFirstMessage = false
      return
    }

    const changes = JSON.parse(data).state_changes
    onReceive(changes.map(({ address, value }) => ({
      id: toUuid(address),
      text: window.atob(value)
    })))
  }
}

module.exports = {
  fetch,
  submit,
  subscribe,
  owner,
  bondtype,
  bonds,
  cryptopubkey,
  cryptotype,
  orders,
  ownerbonds,
  ownercrypto,
  clearer,
  buysellbond,
  get_one_cryptotype
}
