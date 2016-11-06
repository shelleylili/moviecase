/**
 * Created by Administrator on 16-9-1.
 */
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var SALT_WORK_FACTOR =10;
var UserSchema = new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});
UserSchema.pre("save",function(next){
   if(this.isNew){
       this.meta.createAt=this.meta.updateAt=Date.now();
   }else{
       this.meta.updateAt=Date.now();
   }
    var user = this;//this should be the schema instance
    //add salt method
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        console.log("user",user);
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort("meta.updateAt")
            .exec(cb);
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
}
module.exports=UserSchema;