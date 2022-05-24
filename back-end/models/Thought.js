// import utils and dependencies
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create Reply Schema
const ReplySchema = new Schema(
  {
    // create custom reply id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: "Type something- your thoughts are worthy!",
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: "Don't say a word if you're too afraid to leave your name.",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    // add getters
    toJSON: {
      getters: true,
    },
  }
);

// create Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "I sure hope this is important.",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: "Don't say a word if you're too afraid to leave your name.",
    },
    // call Reply Schema
    replies: [ReplySchema],
  },
  {
    // // add virtuals and getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
