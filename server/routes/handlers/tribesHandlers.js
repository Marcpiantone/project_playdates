const assert = require("assert");
require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tribestheapp@gmail.com",
    pass: "I2ViI3Lkch@rZ6oZ*W4o*",
  },
});

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

  const mailSenderFromServer = (dest, sender, tribeName) => {
    const mailOptions = {
      from: "Tribes <noreplytribestheapp@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "You're invited to join a Tribe!", // email subject
      html: `<p style="font-size: 16px;">Hey! Your friend ${sender} has invited you to join the Tribe "${tribeName}" !</p>
                    <br />
                    <p style="font-size: 16px;">Join the ${tribeName} by clicking here: http://localhost:3000/${tribeName}" !</p>
                    
                    <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
                `, // email content in HTML
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err.toString());
      }
      console.log("email sent");
    });
  };

  try {
    console.log(typeof mailSenderFromServer);
    await client.connect();

    const db = client.db("tribes-app");
    const collection = db.collection("tribes");

    const r = await collection.insertOne(newTribe);
    assert.equal(1, r.insertedCount);

    res.status(200).json({ status: 200, data: r.ops[0] });

    sender = r.ops[0].creatorName;
    tribeName = r.ops[0].name;
    console.log(sender);

    r.ops[0].members.forEach((member) => {
      mailSenderFromServer(member, sender, tribeName);
    });
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
