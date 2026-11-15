const router = require('express').Router();

const {
    addGalleryImages,
    removeGalleryImage,
    addProfileImage,
    removeProfileImage,
    addPassportImage,
    removePassportImage,
    addIdentityCardImage,
    removeIdentityCardImage
} = require('../controllers/imageController');

const upload = require('../middleware/upload');


router.post('/students/:id/gallery', upload.array('galleryImages'), addGalleryImages);
router.delete('/students/:id/gallery/:filename', removeGalleryImage);


router.post('/students/:id/profile-image', upload.single('profileImage'), addProfileImage);
router.delete('/students/:id/profile-image', removeProfileImage);


router.post('/students/:id/passport-image', upload.single('passportImage'), addPassportImage);
router.delete('/students/:id/passport-image', removePassportImage);


router.post('/students/:id/identity-card-image', upload.single('identityCardImage'), addIdentityCardImage);
router.delete('/students/:id/identity-card-image', removeIdentityCardImage);


module.exports = router;