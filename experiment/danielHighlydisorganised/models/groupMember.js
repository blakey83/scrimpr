const Joi = require('joi');
const mongoose = require('mongoose');

const GroupMember = mongoose.model('GroupMembers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        minlength: 2,
        maxlength: 255
      },
      team: {
        type: String,
        required: true,
        trim: true, 
        minlength: 2,
        maxlength: 255
      },
}))

function validatepeople(groupMembers) {
    const schema = {
        name: Joi.string().min(3).required(),
        team: Joi.string().required().valid('Backend','Frontend')
    };

    return Joi.validate(groupMembers, schema);
};

exports.GroupMember = GroupMember; 
exports.validate = validatepeople;