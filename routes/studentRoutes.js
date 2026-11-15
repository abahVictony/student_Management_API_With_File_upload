const router = require('express').Router()

const { newStudent, getAllStudents, getOneStudent, updateStudent, deleteStudent } = require('../controllers/studentController')
const uploads = require('../middlewares/multer')


const multipleUploads = uploads.fields([
    {name: 'profileImage', maxCount: 1},
    {name: 'galleryImages', maxCount: 5}, 
    {name: 'passportImage', maxCount: 1}, 
    {name: 'identityCardImage', maxCount: 1}
])

router.post('/newStudent', multipleUploads, newStudent)

router.get('/allStudents', getAllStudents)

router.get('/oneStudent', getOneStudent)

router.patch('/updateStudent/:id', updateStudent)

router.delete('/deleteStudent/:id', deleteStudent)

module.exports = router