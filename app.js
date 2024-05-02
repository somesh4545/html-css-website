const fs = require('fs')
const path = require('path')
const url = require('url')
const http = require('http')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);

  let pathname = path.join(__dirname, 'public', parsedUrl.pathname);

  if(pathname == path.join(__dirname, 'public', '/')) {
    pathname = path.join(__dirname, 'public', 'index.html');
  }

  fs.exists(pathname, (exists) => {
    if(exists) {
      fs.readFile(pathname, (err, data) => {
        if(err) {
          res.end("Internal Server error");
        }else{
          res.end(data)
        }
      })
    }else{
      res.end("404 not found")
    }
  })
})

server.listen(3000,() => {
  console.log("Server working on port 3000")
})