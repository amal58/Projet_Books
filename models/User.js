const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    lastname:{type: String, required: true,},
    firstname:{type: String, required: true,},
  role:{type:String ,enum:["admin","user"],default:"user"},
  }, {
    timestamps: true,
  });

  // Ajouter un champ virtuel "name"
userSchema.virtual('name').get(function () {
  return `${this.lastname} ${this.firstname}`;
});
//topublic method
userSchema.methods.toPublic = function () {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.name = this.name;
  return userObject;
};

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });


  //userSchema.plugin(uniqueValidator);
  module.exports = mongoose.model("User", userSchema);