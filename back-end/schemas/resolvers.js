// import required files
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Menu } = require("../models");

const resolvers = {
  // Query function list
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("You can't be authenticated, bot.");
    },
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("thoughts")
        .populate("friends");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    voteCount: async (parent, { food }) => {
      const results = await User.find({ upvote: food });
      return results.length;
    },
  },

  // Mutation function list
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      // check username and password
      if (!user) {
        throw new AuthenticationError("Someone forgot their username...");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Bad bot- wrong password. Beep, boop- try again."
        );
      }

      const token = signToken(user);
      return { token, user };
    },

    // Upvote function controllers
    upvote: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { upvote: args.food },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError(
        "No one cares about your words unless you are logged in."
      );
    },

    // Thought function controllers
    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError(
        "No one cares about your words unless you are logged in."
      );
    },

    deleteThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError(
        "No one cares about your words unless you are logged in."
      );
    },

    // Reply function controllers
    addReply: async (parent, { thoughtId, replyBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $push: {
              replies: { replyBody, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError(
        "No one cares about your words unless you are logged in."
      );
    },

    // Friends function controllers
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate("friends");

        return updatedUser;
      }

      throw new AuthenticationError(
        "No one cares about your words unless you are logged in."
      );
    },
  },
};

module.exports = resolvers;
