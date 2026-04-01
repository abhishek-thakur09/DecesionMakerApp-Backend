const express = require("express");
const PollRouter = express.Router();
const Poll = require("../models/poll.model");
const Option = require("../models/option.model");
const Vote = require("../models/vote.model");

// for creating a new poll
PollRouter.post("/polls", async (req, res) => {
  try {
    const { question, options, expiryTime } = req.body;

    // if one of them is not filled then give error
    if (!question || !options || options.length < 2 || options.length > 4) {
      return res.status(400).json({ message: "Please fill up all fields" });
    }

    // for create polls
    const poll = await Poll.create({
      question,
      expiryTime,
    });

    // for creating options
    const option = await Option.insertMany(
      options.map((opt) => ({
        text: opt,
        pollId: poll._id,
      })),
    );

    //
    poll.options = option.map((opt) => opt._id);
    await poll.save();

    res.status(201).json({
      message: "Poll created successfully",
      poll,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server failed!" });
  }
});

// getting all polls

PollRouter.get("/allPolls", async (req, res) => {
  try {
    const AllPolls = await Poll.find().populate("options");

    // itterate over the polls and check whether the poll is expired or have some time?

    for (let i = 0; i < AllPolls.length; i++) {
      let poll = AllPolls[i];

      if (poll.expiryTime < Date.now() && poll.status !== "expired") {
        poll.status = "expired";
        await poll.save();
      }
    }

    res.send(AllPolls);
  } catch (err) {
    res.status(500).send({ message: "server failed" });
  }
});

// post the vote
PollRouter.post("/vote", async (req, res) => {
  try {
    const { pollId, optionId } = req.body;

    if (!pollId || !optionId) {
      return res.status(400).send({ message: "pollId and OPTIONid Required" });
    }

    const poll = await Poll.findById(pollId);

    // check whether the pollId is present in db or not?
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Check expiry of the poll
    if (poll.expiryTime < Date.now()) {
      return res.status(400).json({ message: "Poll expired" });
    }

    if (!poll.options.includes(optionId)) {
      return res.status(400).json({ message: "Invalid option" });
    }

    // for user i use ip adress which can help us to differentiate the users or duplicate votes
    const userId = req.ip;

    const checkUserVote = await Vote.findOne({ pollId, userId });

    if (checkUserVote) {
      return res.status(400).send({ message: "User is already voted" });
    }

    await Vote.create({
      pollId,
      optionId,
      userId,
    });

    await Option.findByIdAndUpdate(optionId, {
      $inc: { voteCount: 1 },
    });

    res.json({ message: "Vote recorded successfully" });
  } catch (err) {
    res.status(500).send({ message: "Server failed!" });
  }
});

// get all stats

PollRouter.get("/stats", async (req, res) => {
  try {
    const totalPolls = await Poll.countDocuments();
    const activePolls = await Poll.countDocuments({ status: "active" });
    const expiredPolls = await Poll.countDocuments({ status: "expired" });

    const totalVotes = await Option.aggregate([
      { $group: { _id: null, total: { $sum: "$voteCount" } } },
    ]);


    res.send({totalPolls, activePolls,  expiredPolls, totalVotes});

  } catch (err) {
    res.status(500).send({ message: " server failed" });
  }
});
module.exports = PollRouter;
