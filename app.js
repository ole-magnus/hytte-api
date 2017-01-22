var express = require('express')
var app = express()
var upload = require('./controller/upload')

app.get('/', function (req, res) {
  res.send('Hello World!')
})


function printReqInfo(req) {
	console.log("Req received: " + new Date().toString())
	console.log(req.headers)
	console.log(req.body)
	console.log("-----")
}
app.post('/upload/west', upload.single('file'), function(req, res) {
	printReqInfo(req)
    res.send("Uploaded file: " + req.file)
    res.status(204).end()
})

app.post('/upload/north', upload.single('file'), function(req, res) {
	printReqInfo(req)
    res.send("Uploaded file: " + req.file)
    res.status(204).end()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})