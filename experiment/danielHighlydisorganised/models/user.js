const Joi = require('joi');
const mongoose = require('mongoose');
const emailValidator = require ('email-validator');
const bcrypt = require ('bcrypt');
const SALT_ROUNDS = 12

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, 
        minlength: 2,
        maxlength: 255
      },
      lastName: {
        type: String,
        required: true,
        trim: true, 
        minlength: 2,
        maxlength: 255
      },
      postcode: {
          type: Number,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 12     
      },
      email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
          index: true,
          validate: {
              validator: emailValidator.validate,
              message: props=> `${props.value} is not a valid email address!`
          }
      },
      password: {
          type: String,
          required: true,
          trim: true, 
          minlength: 8,
          maxlength: 25
      }
})

function validateusers(Users) {
    const schema = {
        _id: Joi.number(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().required(),
        postcode: Joi.number().min(1000).max(9999).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required()

    };

    return Joi.validate(Users, schema);
};
UserSchema.pre('save', async function preSave(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = hash;
        return next();
}   catch(e) {
    return next(e);
}
});

UserSchema.methods.comparePassword = async function comparePassword(candidate){
    return bcrypt.compare(candidate, this.password);
};


module.exports = mongoose.model('User', UserSchema); 
exports.validate = validateusers;