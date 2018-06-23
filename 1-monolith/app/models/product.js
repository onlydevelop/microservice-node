let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Product schema definition
let ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ProductSchema.pre('save', next => {
  now = new Date();
  if(!this.purchaseDate) {
    this.purchaseDate = now;
  }
  next();
});

//Exports the ProductSchema for use elsewhere.
module.exports = mongoose.model('product', ProductSchema);
