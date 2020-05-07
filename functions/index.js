const functions = require("firebase-functions");
const createUser = require("./create_User");
const requestOtp = require("./requestOtp");
const verifyOtp = require("./verifyOtp");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://otp-react-native-4e01f.firebaseio.com",
});
exports.createUser = functions.https.onRequest(createUser);
exports.requestOtp = functions.https.onRequest(requestOtp);
exports.verifyOtp = functions.https.onRequest(verifyOtp);
