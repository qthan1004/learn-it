const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  url: { type: String },

  status: {
    type: String,
    enum: ["TO LEARN", "LEARNING", "LEARNED"], //CHỈ CÓ 1 TRONG 3 DẠNG TRONG ARRAY
  },

  //MỖI BẢNG GHI PHẢI THUỘC VỀ 1 USER DUY NHÂT
  //CẦN NỐI BẢNG GHI -> usermodel
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", //KẾT NỐI VỚI BẢNG USERS
  },
});

module.exports = mongoose.model("posts", PostSchema);
