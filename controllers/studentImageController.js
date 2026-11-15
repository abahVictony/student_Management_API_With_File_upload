const {Student} = require('../models');
const path = require('path');
const fs = require('fs')

exports.addGalleryImages = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const data = {
            galleryImages: student.galleryImages
        };

        if (req.files && req.files.length > 0) {
            const filePaths = req.files.map((e) => e.path);
            console.log('New Files:', filePaths);

            const files = student.galleryImages;
            console.log('Old Files:', files);

            const updatedImages = files.concat(filePaths);
            console.log('Updated Files:', updatedImages);

            data.galleryImages = updatedImages;
        }

        await student.update(data);

        res.status(200).json({
            message: 'Image Added',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.removeGalleryImage = async (req, res) => {
    try {
        const { id, filename } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const gallery = student.galleryImages;

        const imageIndex = gallery.findIndex(
            image => path.basename(image) === filename
        );

        if (imageIndex === -1) {
            return res.status(404).json({
                message: 'Image not found'
            });
        }

        const imagePath = gallery[imageIndex];

        gallery.splice(imageIndex, 1);

        await student.update({
            galleryImages: gallery
        });

        await fs.unlinkSync(imagePath);
        

        return res.status(200).json({
            message: 'Gallery image removed successfully',
            data: student.galleryImages
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.addProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload an image'
            });
        }

        const oldFilePath = student.profileImage;

        await student.update({
            profileImage: req.file.path
        });
        if (oldFilePath) {
             await fs.unlinkSync(oldFilePath);
        }
        

        return res.status(200).json({
            message: 'Student profile image updated',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.removeProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const oldFilePath = student.profileImage;

        if (!oldFilePath) {
            return res.status(404).json({
                message: 'Student has no profile image'
            });
        }

        await student.update({
            profileImage: null
        });

        await fs.unlinkSync(oldFilePath);

        return res.status(200).json({
            message: 'Student profile image removed',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.addPassportImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload an image'
            });
        }

        const oldFilePath = student.passportImage;

        await student.update({
            passportImage: req.file.path
        });

        if (oldFilePath) {
            await fs.unlinkSync(oldFilePath);
        }

        return res.status(200).json({
            message: 'Student passport image updated',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.removePassportImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const oldFilePath = student.passportImage;

        if (!oldFilePath) {
            return res.status(404).json({
                message: 'Student has no passport image'
            });
        }

        await student.update({
            passportImage: null
        });

        await fs.unlinkSync(oldFilePath);

        return res.status(200).json({
            message: 'Student passport image removed',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.addIdentityCardImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: 'Please upload an image'
            });
        }

        const oldFilePath = student.identityCardImage;

        await student.update({
            identityCardImage: req.file.path
        });

        if (oldFilePath) {
            await fs.unlinkSync(oldFilePath);
        }

        return res.status(200).json({
            message: 'Student identity card image updated',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.removeIdentityCardImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const oldFilePath = student.identityCardImage;

        if (!oldFilePath) {
            return res.status(404).json({
                message: 'Student has no identity card image'
            });
        }

        await student.update({
            identityCardImage: null
        });

        await fs.unlinkSync(oldFilePath);

        return res.status(200).json({
            message: 'Student identity card image removed',
            data: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};