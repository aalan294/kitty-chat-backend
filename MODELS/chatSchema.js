const mongoose = require('mongoose')

const chatSchema =new  mongoose.Schema({
    sender :{
        type : String,
        required : true
    },
    reciever : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('chat',chatSchema)