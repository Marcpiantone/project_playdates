const assert = require("assert");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;

const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createClient = MongoClient(MONGO_URI, options);

const handleTribes = async (req, res) => {
  const client = await createClient;

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

module.exports = {
  handleTribes,
};
