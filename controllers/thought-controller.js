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
    
}