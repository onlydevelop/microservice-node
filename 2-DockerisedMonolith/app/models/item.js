let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Item schema definition
let ItemSchema = new Schema(
  {
    orderId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ItemSchema.pre('save', next => {
  now = new Date();
  if(!this.purchaseDate) {
    this.purchaseDate = now;
  }
  next();
});

//Exports the ItemSchema for use elsewhere.
module.exports = mongoose.model('item', ItemSchema);
