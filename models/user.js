const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
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
      }],
      toJSON: { 
        virtuals: true,
        getters: true
      },
      id: false
});

UserSchema.virtual('username').get(function() {
    return this.email.slice(0, this.email.indexOf('@'));
  });

const User = model('User', UserSchema);

module.exports = Note;