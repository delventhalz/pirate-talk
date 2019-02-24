'use strict'

require('bootstrap')
require('../styles/main.scss')
const m = require('mithril')
const api = require('./api')
const { createKeys } = require('./signing')
const { encodeTransaction } = require('./transactions')

const getSubmitFn = state => e => {
  e.preventDefault()
  const body = encodeTransaction(state.privateKey, state.newText)
  api.submit(body).then(() => { state.newText = '' })
}

const speak = text => {
  const synth = window.speechSynthesis
  const speechified = text
    .replace('YAR', 'yar')
    .replace(/!/g, ' exclamation point')

  const utterance = new window.SpeechSynthesisUtterance(speechified)
  synth.speak(utterance)
}

const MessageInput = {
  oninit (vnode) {
    vnode.state.privateKey = vnode.attrs.privateKey
  },

  view (vnode) {
    return m('form.form-inline', [
      m('form-group',
        m('label.sr-only', { for: 'message-input' }, 'Message'),
        m('input.form-control#message-input', {
          placeholder: 'Enter message',
          value: vnode.state.newText,
          oninput: m.withAttr('value', v => { vnode.state.newText = v })
        }),
        )
    ])
  }
}

const Message = {
  view (vnode) {
    return m('.card.bg-light.mb-3', {
      onclick: () => speak(vnode.attrs.text)
    }, [
      m('.card-header.text-muted', vnode.attrs.id),
      m('.card-body',
        m('h5.card-title', vnode.attrs.text))
    ])
  }
}

const App = {
  oninit (vnode) {
    vnode.state.keys = createKeys()
    vnode.state.messages = []

    api.fetch().then(messages => { vnode.state.messages = messages })
    api.subscribe(messages => {
      vnode.state.messages = messages.concat(vnode.state.messages)
      messages.forEach(({ text }) => speak(text))
      m.redraw()
    })
  },

  view (vnode) {
    return m('.container', [
      m('h1.text-center.mb-5', 'Crypto Bonds'),
      m('.row.mb-5',
        m('.col-lg',
          m('h5', 'Public Key'),
          vnode.state.keys.publicKey)),
      m('.row',
        m('.col-lg-4.mb-3',
          m('h2.text-left.mb-5', 'Name'),
          m(MessageInput, vnode.state.keys),
          m('h2.text-left.mb-5', 'Bank'),
          m(MessageInput, vnode.state.keys),
          m('h2.text-left.mb-5', 'Amount'),
          m(MessageInput, vnode.state.keys),
          m('h2.text-left.mb-5', 'Denomination'),
          m(MessageInput, vnode.state.keys),
          m('button.btn.btn-primary.ml-2',
          { onclick: getSubmitFn(vnode.state) },
          'Submit')),
        m('.col-lg-8',
          vnode.state.messages.length !== 0
            ? vnode.state.messages.map(attrs => m(Message, attrs))
            : m('h5.text-muted.font-italic.text-center',
                'The chain pirates are silent')))
    ])
  }
}

m.mount(document.getElementById('app'), App)
