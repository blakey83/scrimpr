import joi  from 'joi';
import mongoose from 'mongoose';
import emailValidator from 'email-validator';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
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
        maxlength: 255,
        lowercase: true,
        index: true,
        validate: {
            validator: emailValidator.validate,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 25
    }
});

UserSchema.pre('save', async function preSave(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = hash;
        return next();
    } catch (e) {
        return next(e);
    }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate){
    return bcrypt.compare(candidate, this.password);
};

function validate(Users) {
    const schema = {
        _id: joi.number(),
        firstName: joi.string().min(3).required(),
        lastName: joi.string().required(),
        postcode: joi.number().min(1000).max(9999).required(),
        email: joi.string().min(5).max(255).required(),
        password: joi.string().min(8).max(255).required()

    };

    return joi.validate(Users, schema);
};

const User = mongoose.model('Users', UserSchema);

export {
    User,
    validate,
}