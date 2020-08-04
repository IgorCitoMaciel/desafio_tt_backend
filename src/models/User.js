import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    //email: String,
    //senha: String,
    name: {
        type: String,
        require: true,

    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },



});

export default model('User', UserSchema);