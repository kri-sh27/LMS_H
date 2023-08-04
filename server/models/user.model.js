import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname required"],
      minLength: [5, "Nmae must be 5v chars"],
      maxLength: [50, "not more than 50 chars"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "email is required",
      ],
    },
    password: {
      type: String,
      required: [true, "pass is required"],
      minLength: [8, "must have 8 char"],
      select: false,
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },


    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
  },
  { timestamps: true }
);
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods={
    comparePassword: async function(plainTaxtPassword){
        return await bcrypt.compare(plainTaxtPassword,this.password);
    },
    generateJWTToken:function(){
        return jwt.sign({
            id:this._id,role:this.role,email:this.email,subscription:this.subscription
        },
        process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRY
        });
    }
}

const User=model('User',userSchema);
export default User;