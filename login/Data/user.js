import crypto from "crypto-js";

const user = {
  login: "Alan",
  password: crypto.SHA1("4l4n").toString(),
  // password : "73a056240baf641c8dc2c9bab20e0c2b457bd6e4" // correspond à "4l4n"
};

export default user;
