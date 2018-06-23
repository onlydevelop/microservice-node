let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Inventory schema definition
let InventorySchema = new Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
InventorySchema.pre('save', next => {
  now = new Date();
  if(!this.purchaseDate) {
    this.purchaseDate = now;
  }
  next();
});

//Exports the InventorySchema for use elsewhere.
module.exports = mongoose.model('inventory', InventorySchema);
