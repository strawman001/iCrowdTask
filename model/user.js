const mongoose = require('mongoose');
const ex_validator = require('validator');

const userSchema =new mongoose.Schema({
    country:{
        type:String,
        required:[true,'Please select your COUNTRY']
    },
    firstName:{
        type:String,
        required:[true,'Please fill in your FIRST NAME']
    },
    lastName:{
        type:String,
        required:[true,'Please fill in your LAST NAME']
    },
    email:{
        type:String,
        required:[true,'Please fill in your EMAIL'],
        unique:true,
        validate:{
            validator:function(value){
                return ex_validator.isEmail(value);
            },
            message:'EMAIL format is wrong'
        }
    },
    password:{
        type:String,
        required:[true,'Please fill in your PASSWORD'],
        validate:{
            validator: function(value) {
                return value.length>=8;
            },
            message:'PASSWORD should be at leasr 8 characters'
        }
    },
    confirmPassword:{
        type:String,
        required:[true,'Please confirm your PASSWORD'],
        validate:{
            validator: function(value) {
                return this.password==value;
            },
            message:'PASSWORD and CONFIRMED PASSWORD should be same'
        }
    },
    address:{
        type:String,
        required:[true,'Please fill in your ADDRESS']
    },
    city:{
        type:String,
        required:[true,'Please fill in your CITY']
    },
    province:{
        type:String,
        required:[true,'Please fill in your STATE/PROVINCE/REGION']
    },
    postalCode:{
        type:String,
    },
    phoneNumber:{
        type:String,
        validate:{
            validator:function(value){
                if(value==null||value==''||value==undefined)
                    return true;
                else
                    return ex_validator.isInt(value);
            },
            message:'PHONE NUMBER format is wrong'
        }
    },
    type:{
        type:String,
        default:"local",
        required:true
    },
    extraId:{
        type:String
    }
});
userSchema.index({ email:1 },{unique:true});
const User = mongoose.model('User',userSchema);

module.exports = User;