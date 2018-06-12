'use strict'

require('bootstrap')
require('../styles/main.scss')
const m = require('mithril')

const getSubmitter = state => e => {
  e.preventDefault()
  console.log(state.message)
  document.getElementById('message-input').value = ''
}

const App = {
  view(vnode) {
    return m('.container', [
      m('h1.text-center.mb-5', 'Talk Like a Pirate'),
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
