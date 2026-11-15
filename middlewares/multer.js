const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './images')
    },
    filename: (req, file, cb)=>{
        const fileDate = Date.now()
        const fileNumber = Math.floor(Math.random() * 1e8)
        const fileName = `IMG-${fileDate}-${fileNumber}`
        cb(null, fileName)
    }

})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only JPG, JPEG and PNG images are allowed'))
    }
}


const limits = {
    fileSize: 1024 * 1024 * 2
}

const upload = multer({
    storage,
    fileFilter,
    limits
})

module.exports = upload