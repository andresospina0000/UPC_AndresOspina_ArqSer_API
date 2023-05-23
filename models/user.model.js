const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { schema } = require('./post.model');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: /^.+@.+\..+$/,
        },
        password: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            maxlength: 200,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            }
        }
    }
);

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    }
    else {
        next();
    }
});

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);

