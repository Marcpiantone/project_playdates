const assert = require("assert");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleTribes = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("tribes");

    const r = await collection.find().toArray();

    res.status(200).json({ status: 200, data: r });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const createTribe = async (req, res) => {
  newTribe = req.body;

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("tribes");

    const r = await collection.insertOne(newTribe);
    assert.equal(1, r.insertedCount);

    res.status(200).json({ status: 200, data: r.ops[0] });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const handleTribesById = async (req, res) => {
  const creatorId = req.params.creatorId;
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("tribes");

    const r = await collection.find({ creatorId }).toArray();
    r[0]
      ? res.status(200).json({ status: 200, data: r })
      : res
          .status(404)
          .json({ status: 404, data: [], message: "creatorId not found, 404" });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  handleTribes,
  createTribe,
  handleTribesById,
};
