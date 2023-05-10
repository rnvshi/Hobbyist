const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


/* The following describes user1 sending a friend request to user2.

When friend object is created by user1 in their friend array with values: 

{user2's id, accepted = false, sender = true}

Another object needs to be created in user2's friend array with values: 

{user1's id, accepted = false, sender = false}

Only users with sender = false have the option to accept friend requests, if sender = true friend request will show pending. When user2 accepts the friend request, 
both friend objects' accepted property is set to true, sender is set to null. */

const friendSchema = new Schema({
    //_id of the friend user
    friendId: {
        type: Schema.Types.ObjectId,
            ref: 'User',
    },

    //A boolean to determine the sender of a friend request (true = sender, false = reciever) / users are friends (null) --> not sure if booleans can be null? 
    sender: {
        type: Boolean,
    },

    //A boolean to determine if the friend request is pending (false) or accepted (true)
    accepted: {
        type: Boolean,
    },
});

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    //login parameter, unique to account
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    //public profile name (may be changed)
    pseudonym: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    //login parameter
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
        //some default icon for user profiles, maybe use project logo?
        default: 'https://www.pngitem.com/pimgs/m/10-106042_male-professional-avatar-icon-hd-png-download.png'
    },
    myAlbums: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Album',
        }
    ],
    followedAlbums: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Album',
        }
    ],
    friends: [friendSchema],
})

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;