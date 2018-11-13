const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

const createApp = require('./app')

server.get('*', (req, res) => {
  const app = createApp({ url: req.url })

  renderer.renderToString(app, { title: 'Vue SSR', meta: '' }).then(html => {
    res.end(html)
  }).catch(err => {
    console.error(err)
    res.status(500).end('Internal Server Error')
  })

})

server.listen(8000, () => {
  console.log(`Server running at http://127.0.0.1:8000/`);
})
