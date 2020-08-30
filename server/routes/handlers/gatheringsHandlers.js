const assert = require("assert");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const ObjectId = require("mongodb").ObjectID;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleGatherings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("gatherings");

    const r = await collection.find().toArray();

    res.status(200).json({ status: 200, data: r });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const handleCreateGathering = async (req, res) => {
  newGathering = req.body;
  console.log(newGathering);
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("gatherings");

    const r = await collection.insertOne(newGathering);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: r.ops[0] });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const handleGatheringsByTribeId = async (req, res) => {
  const tribeId = req.params.tribeId;

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("gatherings");

    const r = await collection.find({ tribeId }).toArray();
    r[0]
      ? res.status(200).json({ status: 200, data: r })
      : res
          .status(404)
          .json({ status: 404, data: [], message: "Event not found, 404" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const handleUpdateGathering = async (req, res) => {
  const _id = req.params._id;
  const query = { _id: ObjectId(_id) };
  const newAttendee = req.body.attendee;
  const update = req.body;
  delete update.attendee;

  const updateFields =
    Object.values(update).length !== 0 ? Object.values({ update })[0] : null;

  const newValues =
    updateFields === null
      ? { $push: { attendees: newAttendee } }
      : { $set: updateFields, $push: { attendees: newAttendee } };

  console.log(newValues);

  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("gatherings");

    const r = await collection.updateOne(query, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    r
      ? res.status(200).json({ status: 200, data: r })
      : res.status(404).json({ status: 404, message: "Event not found, 404" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  handleGatherings,
  handleCreateGathering,
  handleGatheringsByTribeId,
  handleUpdateGathering,
};
