const admin = require("firebase-admin");
module.exports = function (req, res) {
  if (!req.body.phone || !req.body.code) {
    return res
      .status(422)
      .send({ message: "Please provide Phone number and code" });
  }
  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);
  admin
    .auth()
    .getUser(phone)
    .then(() => {
      const ref = admin.database().ref("users/" + phone);

      ref.on("value", (snapshot) => {
        const user = snapshot.val();
        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ err: "Code not valid" });
        }
        ref.update({ codeValid: false });
      });
    })
    .catch((err) => {
      return res.status(422).send({ err });
    });
};
