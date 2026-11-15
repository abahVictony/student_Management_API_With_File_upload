const { Student } = require('../models')
const fs = require('fs')

exports.newStudent = async(req, res) =>{
   try {
    const {fullName, email, phoneNo, department} = req.body
    const file = req.file.path
    const filePath = req.files.map((e)=> e.path)

    const data = {
        fullName,
        email,
        phoneNo,
        department,
        profileImage: file,
        galleryImages: filePath,
        passportImage: file,
        identityCardImage: file
    }

    const student = await Student.create(data)
    
    res.status(201).json({
        message: `Student Created Successfully`,
        data: student
    })
   } catch (error) {
    res.status(500).json({
        error: error.message
    })
   }
}

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

        const updatedStudent = await Student.update(data)

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
        const oldFilePath = student.ProfileImage;
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

    await product.destroy();

    res.status(200).json({ 
        message: 'product deleted' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};