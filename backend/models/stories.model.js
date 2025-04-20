const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const storiesSchema = new Schema({
  title: { type: String, require: true },
  story: { type: String, required: true },
  visitedLocation: {type:[String],default:[]},
  isFavourite: {type:Boolean , default:false},
  userId: {type: Schema.Types.ObjectId, ref: "User",required: true},
  createdOn:{type: Date , default: Date.now},
  imageURL: {type:String, required:true},
  visitedDate: {type:Date, required:true}

});

module.exports = mongoose.model("Stories",storiesSchema)