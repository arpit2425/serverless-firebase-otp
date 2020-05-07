const twilio = require("twilio");
const accountSId = "AC441158af402a0452ae443a51dd31c0ad";
const token = "52737f31209127ade4f06f3989b8687d";
module.exports = require("twilio")(accountSId, token);
// module.exports = new twilio.Twilio(accountSId, token);
