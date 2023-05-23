const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5
        },
        author: {
            type: String,
            required: true,
            maxlength: 50
        },
        text: {
            type: String,
            required: true,
            minlength: 5
        },
        image: {
            type: String,
            required: true,
            matchMedia: /^https?:\/\//,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

module.exports = mongoose.model('Post', PostSchema);