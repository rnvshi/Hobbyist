const { Schema, model } = require('mongoose');


const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
})

const postSchema = new Schema({
        //probably don't need userID property, just ensure username matches user.username
        
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User'
        // },

        username: {
            type: String,
            required: true,
            trim: true,
        },
        postImg: {
            type: String,
            required: true,
            trim: true,
            //default value?
        },
        caption: {
            type: String,
            required: true,
        },
        comments: [commentSchema],
        //array of _ids of users who've liked the post, unique such that likes.length can be used to get a total
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            // unique: true,
        }]
    },
    {
        toJSON: {
            virtuals: true,
          },
    }
)


postSchema.virtual('totalLikes').get( function(){
    return this.likes.length;
})

const Post = model('Post', postSchema);

module.exports = Post;