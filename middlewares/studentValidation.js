const Joi = require('joi')

const createStudentValidation = (req, res, next)=>{
    const createStudentSchema = Joi.object({

        fullName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).required().messages({
            "any.required": "Name is Required",
            "string.empty": "PLease input your Full Name",
            "string.pattern.base": "Name must be Alphabets and must be 3 characters long",
        }),

         department: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).required().messages({
            "any.required": "department is Required",
            "string.empty": "PLease input your department",
            "string.pattern.base": "departmentmust be Alphabets and must be 3 characters long",
        }),

        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Please enter your email address",
            "any.required": "The email field is required",
        }),

        phoneNo: Joi.string().trim().min(11).max(14).pattern(/^(?:\+234|234|0)(?:70|80|81|90|91)\d{8}$/).required().messages({
            'string.base': 'Phone number must be a text string.',
            'string.empty': 'Phone number is required and cannot be empty.',
            'any.required': 'Phone number is required.',
            'string.min': 'Phone number must be at least 11 digits (e.g., 08012345678).',
            'string.max': 'Phone number cannot exceed 14 characters (e.g., +2348012345678).',
            'string.pattern.base': 'Please enter a valid Nigerian phone number starting with 0, 234, or +234 followed by 70, 80, 81, 90, or 91.'
            })

        })
    

    const { error } = createStudentSchema.validate(req.body);

    // console.log(error.details);
    
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

const updateStudentValidation = (req, res, next)=>{
    const updateStudentSchema = Joi.object({

        firstName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).optional().messages({
            "any.required": "First Name is Required",
            "string.empty": "PLease input your FirstNAme",
            "string.pattern.base": "First name must be Alphabets and must be 3 characters long",
        }),

         lastName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).optional().messages({
            "any.required": "Last Name is Required",
            "string.empty": "PLease input your FirstNAme",
            "string.pattern.base": "Last name must be Alphabets and must be 3 characters long",
        }),

        email: Joi.string().email().optional().messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Please enter your email address",
            "any.required": "The email field is required",
        }),
        
        phoneNo: Joi.string().trim().min(11).max(14).pattern(/^(?:\+234|234|0)(?:70|80|81|90|91)\d{8}$/).optional().messages({
            'string.base': 'Phone number must be a text string.',
            'string.empty': 'Phone number is required and cannot be empty.',
            'any.required': 'Phone number is required.',
            'string.min': 'Phone number must be at least 11 digits (e.g., 08012345678).',
            'string.max': 'Phone number cannot exceed 14 characters (e.g., +2348012345678).',
            'string.pattern.base': 'Please enter a valid Nigerian phone number starting with 0, 234, or +234 followed by 70, 80, 81, 90, or 91.'
            })

        })
    

    const { error } = updateStudentSchema.validate(req.body);

    // console.log(error.details);
    
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }
next()
}

module.exports={
    createStudentValidation,
    updateStudentValidation
}