let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Client schema definition
let ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ClientSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ClientSchema for use elsewhere.
module.exports = mongoose.model('client', ClientSchema);
