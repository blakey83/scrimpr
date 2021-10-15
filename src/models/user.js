const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('Users', new mongoose.Schema({
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
          minlength: 5,
          maxlength: 255
      },
      password: {
          type: String,
          required: true,
          trim: true, 
          minlength: 8,
          maxlength: 25
      }
}))

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

exports.User = User; 
exports.validate = validateusers;