require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema({
    adminName : {
        type : String,
        required : true
    },
    adminPhone : {
        type : Number,
        required : true,
        unique : true
    },
    adminEmail : {
        type : String,
        required : true,
        unique : true
    },
    adminPassword : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})


adminSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({_id : this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }  catch (e) {
        console.log("the error is : " + e.message);
    }
}

adminSchema.pre('save' , async function (next){
    if(this.isModified("adminPassword")){
    console.log(`orginal password: ${this.adminPassword}`);
    this.adminPassword = await bcrypt.hash(this.adminPassword,10);
    console.log(`Hashed password: ${this.adminPassword}`);
    }
    next();
})

const Admin = new  mongoose.model('Admin', adminSchema);


module.exports = Admin;