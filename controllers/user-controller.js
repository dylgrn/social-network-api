const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userDatadb => res.json(userDatadb))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userDatadb => res.json(userDatadb))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    createUser({ body }, res) {
        User.create(body)
        .then(userDatadb => res.json(userDatadb))
        .catch(err => res.status(400).json(err))
    },
    addFriend ({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId} },
            {new: true, runValidators: true},
        )
    .then(userDatadb => {
        if (!userDatadb) {
            res.status(404).json({ message: 'No user found with that id'})
            return;
        }
        res.json(userDatadb);
    })
    .catch(err => res.json(err))
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(userUpdated => {
            if (!userUpdated) {
                return res.status(404).json({message: 'no user with this id'})
            } 
            res.json(userUpdated)
        })
        .catch(err => res.json(err))
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userDeleted => {
            if (!userDeleted) {
                return res.status(404).json({message: 'no user with this id'})
            } 
            res.json(userDeleted)
        })
        .catch(err => res.json(err))
    },
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId} },
            {new: true, runValidators: true},
        )
        .then(userDatadb => res.json(userDatadb))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController