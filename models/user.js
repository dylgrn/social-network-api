const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: 'First Name is Required'
      },

      email: {
        type: String,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid e-mail address']
      },
  
      thoughts: [{
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }]
    },
    {
      toJSON: { 
        virtuals: true,
      },
      id: false
    });

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
  });

const User = model('User', userSchema);

module.exports = User;