const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path');
const server = jsonServer.create()
const router = jsonServer.router('db.json')


server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
})
server.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/style.css'));
})
server.get('/script.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/script.js'));
})
const rules = auth.rewriter({
  // Route	Resource permissions
  // /664/*	User must be logged to write the resource. 
  //        Everyone can read the resource.
  // /660/*	User must be logged to write or read the resource.
  // /644/*	User must own the resource to write the resource. 
  //        Everyone can read the resource.
  // /640/*	User must own the resource to write the resource. 
  //        User must be logged to read the resource.
  // /600/*	User must own the resource to write or read the resource.
  // /444/*	No one can write the resource. 
  //        Everyone can read the resource.
  // /440/*	No one can write the resource. 
  //        User must be logged to read the resource.
  // /400/*	No one can write the resource. 
  //        User must own the resource to read the resource.
    users: 400,
    profiles: 400,
    posts: 644,
    comments: 644,
    categories: 400,
    public: 444
  })

  // Add custom routes before JSON Server router
  server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(rules)
server.use(auth)
server.db = router.db
server.use(router)
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...')
})