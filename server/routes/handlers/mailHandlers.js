const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tribestheapp@gmail.com",
    pass: "I2ViI3Lkch@rZ6oZ*W4o*",
  },
});

const mailSender = (req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.body.dest;
    console.log(dest);
    const mailOptions = {
      from: "Tribes <noreplytribestheapp@gmail.com>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "I'M A PICKLE!!!", // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            `, // email content in HTML
    };
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send(err.toString());
      }
      return res.status(200).json({ message: "Email sent", data: mailOptions });
    });
  });
};

module.exports = {
  mailSender,
};
