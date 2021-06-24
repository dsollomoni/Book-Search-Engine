const { UserInputError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken, verifyToken } = require("../utils/auth");


const resolvers = {
  Query: {
    async login(parent, args, context) {
      let foundUser = await User.findOne({ $or: [{ email: args.email }] });

      const correctPw = await foundUser.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new UserInputError("Error")
      }
      const token = signToken(foundUser);
      let result = {User:{username:foundUser.username, email:foundUser.email, password: foundUser.password, id: foundUser._id, savedBooks: foundUser.savedBooks},  token:{token}};
      console.log(result)
      return result
    },
    async getUserByUsername(parent, args) {
      const foundUser = await User.findOne({
      
        username: args.username
      });
  
      if (!foundUser) {
        throw new UserInputError("User not found!")
      }
  
      return foundUser;
    },
    async getUserById(parent, args, context) {
      let id = context._id
      if ((args.token !== undefined) && verifyToken(args.token).verify){
      id = verifyToken(args.token)._id 
      }
      const foundUser = await User.findOne({
      $or: [
        {_id: id},
        {_id: args.id},
      ],
        
      });
  
      if (!foundUser) {
        throw new UserInputError(context._id)
      }
  
      return foundUser;
    }
  },
  Mutation: {
    async createUser(parent, args) {
      const user = await User.create(args);
  
      if (!user) {
       throw UserInputError("Incorrect parameters!")
      }
      const token = signToken(user);
      console.log(user, token)
      return {User:{username:user.username, email:user.email, password: user.password, id: user._id, savedBooks: user.savedBooks},  token:{token}};
    },
    async saveBook(parent, args, context) {
      let id = context._id
      if (args.token && verifyToken(args.token).verify){
      id = verifyToken(args.token)._id 
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          {$or: [
            {_id: id},
          { _id: args.id }]},
          { $addToSet: { savedBooks: args.book } },
          { new: true, runValidators: true }
        );
        console.log(updatedUser)
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new UserInputError("Failed to update!")
      }
    },
    async deleteBook(parent, args, context) {
      let id = context._id
      if (args.token && verifyToken(args.token).verify){
      id = verifyToken(args.token)._id 
      }
      
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new UserInputError("Failed to delete!")
      }
      return updatedUser;
      
    },
  }
};

module.exports = resolvers;
