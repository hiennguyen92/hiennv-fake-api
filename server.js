const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const router = jsonServer.router('db.json')

const rules = auth.rewriter({
    // Permission rules
    users: 400,
    profiles: 400,
  })

server.use(rules)
server.use(auth)
server.db = router.db
server.use(router)
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
})