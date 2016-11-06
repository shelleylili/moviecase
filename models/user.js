/**
 * Created by Administrator on 16-9-1.
 */
var mongoose = require("mongoose");
var UserSchema = require("../schemas/users");
var User = mongoose.model("User",UserSchema);

module.exports = User;