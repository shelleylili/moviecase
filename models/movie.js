/**
 * Created by Administrator on 16-9-1.
 */
var mongoose = require("mongoose");
var MovieSchema = require("../schemas/movies");
console.log(MovieSchema.fetch);
var Movie = mongoose.model("Movie",MovieSchema);

module.exports = Movie;