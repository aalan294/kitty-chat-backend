const express = require('express') 
const router = express.Router()
const Users = require('../MODELS/userSchema')
const Chats = require('../MODELS/chatSchema')

router.route('/users')
    .get(async(req,res)=>{
       try {
        const users = await Users.find()
        res.json(users)
       } catch (error) {
            res.status(400).send()
            console.log(err.message)
       }
    })
router.route('/users/:id')
    .delete(async(req,res)=>{
        try {
            const {id} = req.params
            await Users.findByIdAndDelete(id)
            res.json({"message":"sucessfully deleted"})
        } catch (error) {
            res.status(400).send()
            console.log(error.message)
        }
    })
router.route('/main/:id')
    .get(async(req,res)=>{
        try{
            let list = []
           const name = req.params.id;
           const chat1 = await Chats.find({sender:name})
           const chat2 = await Chats.find({reciever:name})
           let chats = [...chat1 , ...chat2]
           for(a of chats){
            if(a.sender!==name && !list.includes(a.sender)){
                list.push(a.sender)
              }
            else if(a.reciever!==name && !list.includes(a.reciever)){
                list.push(a.reciever)
           }
        }
        res.json(list)
        }catch(err){
            res.status(400).send()
        }
    })
router.route('/chats/:id')
    .get(async(req,res)=>{
        try{
        
            const name = req.params.id
            const chat1 = await Chats.find({sender:name}).sort({ timestamp: -1 })
            const chat2 = await Chats.find({reciever:name}).sort({ timestamp: -1 })
            let chats = [...chat1 , ...chat2]
            const sortedchat = chats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            res.json(sortedchat)
        }catch(err){
            res.status(400).send()
            console.log(err.message)
        }
    })
    .delete(async(req,res)=>{
        try {
            const {id} = req.params
            await Chats.findByIdAndDelete(id)
            res.json({"message":"successfully deleted"})
        } catch (error) {
            res.status(400).send
        }
        
    })

router.route('/chats')
    .post(async(req,res)=>{
        const {sender , reciever , message} = req.body
        const update = {
            sender : sender,
            reciever : reciever,
            message : message
        }
        try {

            const temp = await Chats.create(update)
            res.json(temp)
        } catch (err) {
            res.status(400).send()
            console.log(err.message)
        }
    })
    .get(async(req,res)=>{
        try {
            const testing = await Chats.find()
            res.json(testing)
        } catch (err) {
            res.status(400).send()
        }
    })

module.exports = router