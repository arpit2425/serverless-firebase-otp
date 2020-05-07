const admin = require("firebase-admin");
const twilio = require("./Twilio");
// module.exports = function (req, res) {
//   if (!req.body.phone) {
//     return res.status(422).send({ err: "error" });
//   }
//   const phone = String(req.body.phone).replace(/[^\d]/g, "");

//   admin
//     .auth()
//     .getUser(phone)
//     .then((userInfo) => {
//       const code = Math.floor(Math.random() * 8999 + 1000);
//       twilio.messages
//         .create({
//           body: "Your code is " + code,
//           to: "+91" + phone,
//           from: "+17243906204",
//         })
//         .then(() => res.send({ status: "Send" }));
//     })
//     .catch((err) => {
//       res.status(422).send({ error: err });
//     });
// };
module.exports = function (req, res) {
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  //   const phone = String(8960767360).replace(/[^\d]/g, "");
  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const code = Math.floor(Math.random() * 8999 + 1000);
      twilio.messages
        .create({
          body: "Your code is " + code,
          to: "+91" + phone,
          from: "+17243906204",
        })
        // .then((ans) => res.send(ans));
        .then((ans) => {
          admin
            .database()
            .ref("users/" + phone)
            .update({ code: code, codeValid: true })
            .then(() =>
              res.send({ message: "Code sent and saved in database" })
            )
            .catch((err) => res.send({ err }));
        })
        .catch((err) => {
          res.send({ err });
        });
    });
};
