const server = require('./server')

server.listen(9999)

setTimeout(closeServer, 2000)

function closeServer() {
  console.log('closing server')
  server.close()
}