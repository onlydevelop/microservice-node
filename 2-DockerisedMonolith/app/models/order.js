let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Order schema definition
let OrderSchema = new Schema(
  {
    shipped: { type: Boolean, required: true },
    purchaseDate: { type: Date, default: Date.now },
    clientId: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
OrderSchema.pre('save', next => {
  now = new Date();
  if(!this.purchaseDate) {
    this.purchaseDate = now;
  }
  next();
});

//Exports the OrderSchema for use elsewhere.
module.exports = mongoose.model('order', OrderSchema);
