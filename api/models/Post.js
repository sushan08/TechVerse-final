const mongoose = require ("mongoose")
const PostSchema = new mongoose.Schema(
{
    title:{
        type: String,
        require: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: false,
      },
      username: {
        type: String,
        required: true,
      },
      categories: {
        type: Array,
        required: false,
      },
      likes: { 
        type: Number, 
        default: 0 
      },
      views: {
        type: Number,
        default: 0,
      } // Initialize likes with a default value of 0
    
},
{ timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);