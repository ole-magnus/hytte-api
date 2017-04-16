var express = require('express')
var app = express()
var upload = require('./controller/upload')

app.set('view engine', 'pug')
app.use(express.static('uploads'))

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

app.get("/status", function(req, res) {
	res.send("ON")
	res.status(200).end()
})


app.get("/images", function(req, res) {
	const imageFolder = './uploads/'
	const fs = require('fs')

	fs.readdir(imageFolder, (err, files) => {
		const recordings = getRecordings(files)
		res.render('index', { recordings: recordings })

	})
})

function getRecordings(fileNames) {
	const images = fileNames.filter(function(item) {
		return item.endsWith('.jpg');
	});
	const recordings = images.map(function(fileName) {
		const position = fileName.split('-')[0]
		const time = fileName.split('-')[1].split('.')[0]
		const recording = {
			image: fileName,
			position: position,
			time: time
		}
		return recording
	})
	return recordings
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})