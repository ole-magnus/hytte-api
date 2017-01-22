var multer = require('multer')

// Storage option can be changed - check Multer docs 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var path = './uploads' // Make sure this path exists 
        cb(null, path)
    },
    filename: function (req, file, cb) {
    	var camName = req.body.name
    	cb(null, camName + '-' + Date.now() + ".jpg")
  	}
})

var upload = multer({
    storage: storage
})

// Will handle POST requests to /upload
// router.post('/', upload.single('file'), function(req, res) {
//     res.status(204).end()
// })

module.exports = upload