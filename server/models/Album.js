const { Schema, model } = require('mongoose');

const albumSchema = new Schema({
    //could probably eliminate this property

    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    
    username: {
        type: String,
        required: true,
    },
    albumName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

const Album = model('Album', albumSchema);

module.exports = Album;