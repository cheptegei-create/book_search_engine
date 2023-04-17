// import user model
// import user from models
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

// defining the queries and mutations for the application
const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      saveBook: async (parent, { bookAuthors, description, title, bookId, image, link }, context) => {
        if (context.user) {
        //   const thought = await Thought.create({
        //     thoughtText,
        //     thoughtAuthor: context.user.username,
        //   });
  
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: { bookAuthors, description, title, bookId, image, link } } },
            { new: true, runValidators: true }
          );
  
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      removeBook: async (parent, { params }, context) => {
        if (context.user) {
        //   const book = await User.findOneAndDelete({
        //     _id: thoughtId,
        //     thoughtAuthor: context.user.username,
        //   });
  
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
          );
  
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;
  