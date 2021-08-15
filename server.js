const jsonServer = require('json-server')
const auth = require('json-server-auth')
const path = require('path');
var multer = require('multer');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const express = require('express');
const uploadCheck = require('./upload')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
})

const upload = multer({ storage });
const uploadAvatar = upload.single('avatar');

const getFullUrl = (req, des) => `${req.protocol}://${req.headers.host}${des}`;
server.post('/avatar', uploadCheck.checkjwt, function (req, res, next) {
  uploadAvatar(req, res, error => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    if (error) {
      res.status(400).send(error);
    } else {
      var file = req.file;
      var fileName = file.fieldname + path.extname(file.originalname);
      const fullUrl = getFullUrl(req, `/uploads/${fileName}`);
      res.json({ name: fileName, url: fullUrl });
    }
  });;
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

server.use(upload.any());
server.use(express.static(path.join(__dirname, 'public')));
server.use(rules)
server.use(auth)
server.db = router.db
server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...')
})