'use strict'

require('bootstrap')
require('../styles/main.scss')
const m = require('mithril')
const api = require('./api')
const { createKeys } = require('./signing')
const { encodeTransaction } = require('./transactions')

const { BatchList } = require('sawtooth-sdk/protobuf')

const getSubmitFn = state => e => {
  e.preventDefault()
  const body = encodeTransaction(state.privateKey, state.message)
  api.submit(body).then(() => { state.message = '' })
}

const MessageSubmitter = {
  oninit(vnode) {
    vnode.state.privateKey = vnode.attrs.privateKey
  },

  view(vnode) {
    return m('form.form-inline', [
      m('form-group',
        m('label.sr-only', { for: 'message-input' }, 'Message'),
        m('input.form-control#message-input', {
          placeholder: 'Enter message',
          value: vnode.state.message,
          oninput: m.withAttr('value', v => { vnode.state.message = v })
        }),
        m('button.btn.btn-primary.ml-2',
          { onclick: getSubmitFn(vnode.state) },
          'Submit'))
    ])
  }
}

const Message = {
  view(vnode) {
    return m('.card.bg-light.mb-3', [
      m('.card-header.text-muted', vnode.attrs.id),
      m('.card-body',
        m('h5.card-title', vnode.attrs.message))
    ])
  }
}

const App = {
  oninit(vnode) {
    vnode.state.keys = createKeys()
    vnode.state.messages = []

    api.fetch().then(messages => { vnode.state.messages = messages })
  },

  view(vnode) {
    return m('.container', [
      m('h1.text-center.mb-5', 'Talk Like a Pirate'),
      m('.row.mb-3',
        m('.col-md',
          m('h5', 'Public Key'),
          vnode.state.keys.publicKey)),
      m('.row',
        m('.col-md',
          m(MessageSubmitter, vnode.state.keys)),
        m('.col-md',
          vnode.state.messages.map(attrs => m(Message, attrs))))
    ])
  }
}

m.mount(document.getElementById('app'), App)
