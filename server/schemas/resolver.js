const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //Get a single user or the logged in user
        getSingleUser: async (parent, { userId, username }) => {
            const query = userId ? { _id: userId } : { username: username };
            const foundUser = await User.findOne(query);
            if (!foundUser) throw new Error('Cannot find a user with this id or username!');
            return foundUser;
        },
    },

    Mutation: {
        //Create a new user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            if (!user) throw new Error('Something went wrong!');
            const token = signToken(user);
            return { token, user };
        },
        
        //Login a user
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) throw new Error("Can't find this user");
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) throw new Error('Wrong password!');
            const token = signToken(user);
            return { token, user };
        },

        //Save a book to a user's savedBooks
        saveBook: async (parent, { bookInput }, context) => {
            if (!context.user) throw new Error('Authentication Error!');
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { 
                $addToSet: { savedBooks: bookInput } }, 
                { new: true, runValidators: true });
            if (!updatedUser) throw new Error('Error saving book')
            return updatedUser;
        },

        //Remove a book from a user's savedBooks
        deleteBook: async (parent, { bookId }, context) => {
            if (!context.user) throw new Error('Authentication Error!');
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            if (!updatedUser) throw new Error('Error removing book');
            return updatedUser;
        },
    },
};

module.exports = resolvers;