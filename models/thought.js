const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280 
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: created => moment(created).format('MM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON: {
        virtuals: true
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
      },

      createdAt: {
        type: Date,
        default: Date.now,
        get: (created) => moment(created).format('MM DD, YYYY [at] hh:mm a')
      },
  
      userName: [{
          type: String,
          required: true
      }],
      reactions: [reactionSchema]
    },
    {
      toJSON: { 
        virtuals: true,
      },
      id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;