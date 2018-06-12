'use strict'

require('bootstrap')
require('../styles/main.scss')
const m = require('mithril')
const api = require('./api')
const { createKeys } = require('./signing')
const { encodeTransaction } = require('./transactions')

const { BatchList } = require('sawtooth-sdk/protobuf')

const getSubmitter = state => e => {
  e.preventDefault()
  const body = encodeTransaction(state.keys.privateKey, state.message)

  api.submit(body).then(() => {
    document.getElementById('message-input').value = ''
  })
}

const App = {
  oninit(vnode) {
    vnode.state.keys = createKeys()
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
          m('form.form-inline',
            m('form-group',
              m('label.sr-only', { for: 'message-input' }, 'Message'),
              m('input.form-control#message-input', {
                placeholder: 'Enter message',
                oninput: m.withAttr('value', v => { vnode.state.message = v })
              }),
              m('button.btn.btn-primary.ml-1',
                { onclick: getSubmitter(vnode.state) },
                'Submit')))),
        m('.col-md',
          'YARRR TEST DATA!!!!'))
    ])
  }
}

m.render(document.getElementById('app'), m(App))
