const { Student } = require('../models')
const fs = require('fs')

const getImage = (file) => {
    if (file) {
        return file[0].path;
    } else {
        return null;
    }
};

exports.newStudent = async (req, res) => {
    try {
        const { fullName, email, phoneNo, department } = req.body;

        const files = req.files || {};

        const data = {
            fullName,
            email,
            phoneNo,
            department,

            profileImage: getImage(files.profileImage),
            passportImage: getImage(files.passportImage),
            identityCardImage: getImage(files.identityCardImage),
        };

        const student = await Student.create(data);

        res.status(201).json({
            message: 'Student Created Successfully',
            data: student
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAllStudents = async(req, res) =>{
   try {
     const students = await Student.findAll()

    res.status(200).json({
        message: `All students gotten successfully`,
        data: students
    })
   } catch (error) {
        res.status(500).json({
            message: error.message
        })
   }
}

exports.getOneStudent = async(req, res)=>{
    try {
        const {id} = req.params

        const student = await Student.findByPk(id)

        if (!student) {
           return  res.status(404).json({
                message: `Student not Found`
            })
        }

        res.status(200).json({
            message: `Student Gotten Successfully`,
            data: student
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const {id} = req.params;
        const { fullName, email, department, phoneNo } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                message: 'student not found'
            });
        }

        const data = {
            fullName,
            email,
            department,
            phoneNo
        }

        const updatedStudent = await student.update(data)

        res.status(200).json({
            message: "Student Updated",
            data: updatedStudent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteStudent = async (req, res) => {
  try {
    const {id} = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ 
        message: 'Student not found' 
    });
    }
    
    if (student.profileImage ) {
        const oldFilePath = student.profileImage;
        fs.unlinkSync(oldFilePath);
    }

    if (student.passportImage) {
        const oldFilePath = student.passportImage;
        fs.unlinkSync(oldFilePath);
    }

    if (student.identityCardImage) {
        const oldFilePath = student.identityCardImage;
        fs.unlinkSync(oldFilePath);
    }

    if (student.galleryImages && student.galleryImages.length > 0) {
        student.galleryImages.forEach(element => {
        fs.unlinkSync(element);
    });
}

    await student.destroy();

    res.status(200).json({ 
        message: 'Student deleted' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};