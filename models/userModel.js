const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Please provide your fullname"],
    unique:true, 
  }, 
  email: {
    type:String,
    required:[true,"Please provide your email"],
    unique:true, 
  },
  password: {
    type:String,
    required:[true,"Please provide a password"],
    minlength:8, 
  }
});


userSchema.statics.login=async function(name,email,password) {
  const user = await this.findOne({ email,name});
  if (!user) {
      throw Error('User not found');
  }
  const match=await bcrypt.compare(password, user.password);
  if (!match) {
      throw Error('Incorrect password');
  }

  return user;
}

userSchema.statics.signup=async function(name,email,password){
    const exists=await this.findOne({email})
    if(exists){
        throw Error('Email already in use')
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)

    const user=await this.create({name,email,password:hash})
    return user;
}
const User = mongoose.model("User", userSchema);
module.exports = User;
