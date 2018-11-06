const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>Hello Vue SSR! URL: {{ url }}</div>`
  })

  renderer.renderToString(app, { title: 'Vue SSR', meta: '' }).then(html => {
    res.end(html)
  }).catch(err => {
    console.error(err)
    res.status(500).end('Internal Server Error')
  })

})

server.listen(8000)
