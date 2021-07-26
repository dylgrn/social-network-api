const { Thought, User } = require('../models')

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtDatadb => res.json(thoughtDatadb))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(thoughtDatadb => res.json(thoughtDatadb))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {userName: body.userName},
                {$push: {toughts: _id}},
                {new: true}
            )
        })
        .then(userDatadb => {
            if (!userDatadb) {
                res.status(404).json({ message: 'No user found with that username'})
                return;
            }
            res.json(userDatadb);
        })
        .catch(err => res.json(err))
    },
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true},
        )
    .then(userDatadb => {
        if (!userDatadb) {
            res.status(404).json({ message: 'No thought found with that id'})
            return;
        }
        res.json(userDatadb);
    })
    .catch(err => res.json(err))
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId} } },
            { new: true }
        )
        .then(thoughtDatadb => res.json(thoughtDatadb))
        .catch(err => res.json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(thoughtUpdated => {
            if (!thoughtUpdated) {
                return res.status(404).json({message: 'no thought with this id'})
            } 
            res.json(thoughtUpdated)
        })
        .catch(err => res.json(err))
    },
    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtUpdated => {
            if (!thoughtDeleted) {
                return res.status(404).json({message: 'no thought with this id'})
            } 
            res.json(thoughtDeleted)
        })
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController