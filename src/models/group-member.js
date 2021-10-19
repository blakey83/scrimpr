import joi from 'joi';
import mongoose from 'mongoose';

const GroupMemberSchema = new mongoose.Schema({
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
});

function validate(groupMembers) {
    const schema = {
        name: joi.string().min(3).required(),
        team: joi.string().required().valid('Backend','Frontend')
    };

    return joi.validate(groupMembers, schema);
};

const GroupMember = mongoose.model('GroupMembers', GroupMemberSchema);

export {
    GroupMember,
    validate,
}